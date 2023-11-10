interface SignupData {
  username: string
  password: string
  confirmPassword: string
}

export function Component() {
  const { t } = useTranslation(['GLOBAL', 'AUTH', 'USER', 'VALIDATION'])

  const { message } = AntdApp.useApp()

  const userStore = useUserStore()

  const navigate = useNavigate()

  const [form] = AForm.useForm<SignupData>()

  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => AuthAPI.signup(data),
    onSuccess: async (res) => {
      const { data, message: mes } = res ?? {}
      const { accessToken, user } = data ?? {}
      AuthUtils.setToken(accessToken)
      userStore.setUser(user)

      if (mes) {
        await message.success(mes)
      }

      navigate('/', { replace: true })
    },
    onError: async (error: Error) => {
      form.setFieldsValue({ password: '', confirmPassword: '' })
      if (error.message) {
        await message.error(error.message)
      }
    }
  })

  /**
   * 注册
   */
  const handleSignup = (values: SignupData) => signupMutation.mutate(values)

  const handleLogin = () => navigate('/login')

  return (
    <div className="absolute inset-0 m-auto flex h-fit w-[340px] max-w-[85%] flex-col space-y-4 rounded-lg bg-default-light px-4 py-8 shadow-md transition-colors dark:bg-default-dark sm:w-[260px] md:w-[340px]">
      <div className="text-center text-lg font-semibold">{t('GLOBAL:Menu.Signup')}</div>

      <AForm
        form={form}
        name="signup"
        initialValues={{
          username: '',
          password: '',
          ConfirmPassword: ''
        }}
        onFinish={handleSignup}
        autoComplete="off"
        disabled={signupMutation.isPending}
      >
        <AForm.Item
          name="username"
          rules={[{ required: true, message: t('VALIDATION:USERNAME') }]}
          rootClassName="!mb-4"
        >
          <AInput placeholder={t('USER:Username')} />
        </AForm.Item>

        <AForm.Item
          name="password"
          rules={[
            { required: true, message: t('VALIDATION:PASSWORD') },
            { type: 'string', min: 6, message: t('VALIDATION:PASSWORD.LENGTH') }
          ]}
          rootClassName="!mb-4"
        >
          <AInput.Password placeholder={t('USER:Password')} />
        </AForm.Item>

        <AForm.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: t('VALIDATION:CONFIRM.PASSWORD') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(t('VALIDATION:CONFIRM.PASSWORD.NOT.MATCH')))
              }
            })
          ]}
          rootClassName="!mb-4"
        >
          <AInput.Password placeholder={t('GLOBAL:ConfirmPassword')} />
        </AForm.Item>

        <AForm.Item rootClassName="!mb-2">
          <AButton
            rootClassName="!w-full"
            type="primary"
            htmlType="submit"
            disabled={signupMutation.isPending}
            loading={signupMutation.isPending}
          >
            {t('GLOBAL:Menu.Signup')}
          </AButton>
        </AForm.Item>

        <div className="flex items-center space-x-1 text-xs">
          <span>{t('AUTH:SIGN.UP.ALREADY.HAVE.ACCOUNT')}</span>
          <AConfigProvider
            theme={{
              components: {
                Button: {
                  paddingInlineSM: 0
                }
              }
            }}
          >
            <AButton
              size="small"
              type="link"
              htmlType="button"
              onClick={handleLogin}
            >
              <span className="text-xs font-semibold underline-offset-4 hover:underline">
                {t('GLOBAL:Menu.Login')}
              </span>
            </AButton>
          </AConfigProvider>
        </div>
      </AForm>
    </div>
  )
}
