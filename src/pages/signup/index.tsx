interface SignupData {
  username: string
  password: string
  confirmPassword: string
}

export function Component() {
  const { t } = useTranslation(['AUTH', 'USER', 'VALIDATION'])
  const { message } = AApp.useApp()
  const userStore = useUserStore()
  const navigate = useNavigate()
  const [form] = AForm.useForm<SignupData>()

  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => AuthAPI.signup(data),
    onSuccess: async (res) => {
      const { data, msg } = res ?? {}
      const { accessToken, refreshToken, user } = data ?? {}
      AuthUtils.setAccessToken(accessToken)
      AuthUtils.setRefreshToken(refreshToken)
      userStore.setUser(user)
      message.success(msg)
      navigate('/', { replace: true })
    },
    onError: () => form.setFieldsValue({ password: '', confirmPassword: '' })
  })

  // 注册
  const handleSignup = (values: SignupData) => signupMutation.mutate(values)

  // 跳转到登录页面
  const handleLogin = () => navigate('/login')

  return (
    <div className="absolute inset-0 m-auto flex h-fit w-[360px] max-w-[90%] flex-col space-y-4 rounded-lg bg-[#ffffff] p-8 shadow-md dark:bg-[#222222]">
      <div className="text-center text-lg font-semibold">{t('SIGN.UP')}</div>
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
          <AInput
            placeholder={t('USER:USERNAME')}
            autoComplete="username"
          />
        </AForm.Item>

        <AForm.Item
          name="password"
          rules={[
            { required: true, message: t('VALIDATION:PASSWORD') },
            { type: 'string', min: 6, message: t('VALIDATION:PASSWORD.LENGTH') }
          ]}
          rootClassName="!mb-4"
        >
          <AInput.Password
            placeholder={t('USER:PASSWORD')}
            autoComplete="new-password"
          />
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
          <AInput.Password
            placeholder={t('USER:CONFIRM.PASSWORD')}
            autoComplete="new-password"
          />
        </AForm.Item>

        <AForm.Item rootClassName="!mb-2">
          <AButton
            rootClassName="!w-full"
            type="primary"
            disabled={signupMutation.isPending}
            loading={signupMutation.isPending}
          >
            {t('SIGN.UP')}
          </AButton>
        </AForm.Item>

        <div className="flex items-center space-x-1 text-xs">
          <span>{t('ALREADY.HAVE.ACCOUNT')}</span>
          <AConfigProvider theme={{ components: { Button: { paddingInlineSM: 0 } } }}>
            <AButton
              size="small"
              type="link"
              onClick={handleLogin}
            >
              <span className="text-xs font-semibold underline-offset-4 hover:underline">
                {t('LOGIN')}
              </span>
            </AButton>
          </AConfigProvider>
        </div>
      </AForm>
    </div>
  )
}
