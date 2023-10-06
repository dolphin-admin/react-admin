interface SignupData {
  username: string
  password: string
  confirmPassword: string
}

export function Component(): React.JSX.Element {
  const { t } = useTranslation(['Global', 'Auth', 'User', 'Validation'])
  const [messageApi, contextHolder] = message.useMessage()

  const userStore = useUserStore()

  const navigate = useNavigate()

  const [form] = Form.useForm<SignupData>()

  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => AuthAPI.signup(data),
    onSuccess: (res) => {
      const { accessToken, user } = res.data || {}
      AuthUtils.setToken(accessToken)
      userStore.setUser(user)
      navigate('/', { replace: true })
    },
    onError: async ({ message }) => {
      form.setFieldsValue({ password: '', confirmPassword: '' })
      await messageApi.open({
        type: 'error',
        content: message as string
      })
    }
  })

  /**
   * 注册
   */
  const handleSignup = (values: SignupData) => {
    signupMutation.mutate(values)
  }

  const handleLogin = () => navigate('/login')
  return (
    <div className="absolute inset-0 m-auto flex h-fit w-[340px] max-w-[85%] flex-col space-y-4 rounded-lg bg-default-light px-4 py-8 shadow-md transition-colors dark:bg-default-dark sm:w-[260px] md:w-[340px]">
      {contextHolder}
      <div className="select-none text-center text-lg font-semibold">
        {t('Global:Menu.Signup')}
      </div>
      <Form
        form={form}
        name="signup"
        initialValues={{
          username: '',
          password: '',
          ConfirmPassword: ''
        }}
        onFinish={handleSignup}
        autoComplete="off"
        disabled={signupMutation.isLoading}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: t('Validation:Username') }]}
          rootClassName="!mb-4"
        >
          <Input placeholder={t('User:Username')} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: t('Validation:Password') },
            { type: 'string', min: 6, message: t('Validation:PasswordLength') }
          ]}
          rootClassName="!mb-4"
        >
          <Input.Password placeholder={t('User:Password')} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: t('Validation:ConfirmPassword') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error(t('Validation:ConfirmPasswordNotMatch'))
                )
              }
            })
          ]}
          rootClassName="!mb-4"
        >
          <Input.Password placeholder={t('Global:ConfirmPassword')} />
        </Form.Item>

        <Form.Item rootClassName="!mb-2">
          <Button
            rootClassName="!w-full"
            type="primary"
            htmlType="submit"
            disabled={signupMutation.isLoading}
            loading={signupMutation.isLoading}
          >
            {t('Global:Menu.Signup')}
          </Button>
        </Form.Item>

        <div className="flex items-center space-x-1 text-xs">
          <span>{t('Auth:Signup.AlreadyHaveAccount')}</span>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  paddingInlineSM: 0
                }
              }
            }}
          >
            <Button
              size="small"
              type="link"
              htmlType="button"
              onClick={handleLogin}
            >
              <span className="text-xs font-semibold underline-offset-4 hover:underline">
                {t('Global:Menu.Login')}
              </span>
            </Button>
          </ConfigProvider>
        </div>
      </Form>
    </div>
  )
}
