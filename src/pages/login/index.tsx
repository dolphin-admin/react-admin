interface LoginData {
  username: string
  password: string
}

interface FormValues extends LoginData {
  rememberPassword: boolean
}

export function Component() {
  const { t } = useTranslation(['COMMON', 'AUTH', 'USER', 'VALIDATION'])
  const { message } = AApp.useApp()
  const userStore = useUserStore()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [form] = AForm.useForm<FormValues>()

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => AuthAPI.login(data),
    onSuccess: (res) => {
      const { data, message: msg } = res ?? {}
      const { accessToken, user } = data ?? {}
      AuthUtils.setToken(accessToken)
      userStore.setUser(user)

      message.success(msg)

      const formData = form.getFieldsValue()
      if (formData.rememberPassword) {
        AuthUtils.setRememberedAccount(JSON.stringify(formData))
      } else {
        AuthUtils.clearRememberedAccount()
      }

      if (searchParams.get('redirect')) {
        navigate(searchParams.get('redirect')!, { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    },
    onError: () => form.setFieldValue('password', '')
  })

  useEffect(() => {
    // 从 localStorage 中获取记住的账号密码
    const localStorageData = AuthUtils.getRememberedAccount()
    if (localStorageData) {
      try {
        const data = JSON.parse(localStorageData) as FormValues
        form.setFieldsValue(data)
      } catch {
        //
      }
    }
  }, [form])

  // 登录
  const handleLogin = (values: FormValues) => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { rememberPassword, ...loginData } = values
    loginMutation.mutate(loginData)
  }

  // 以基本用户身份登录
  const loginAsBasic = () => handleLogin(form.getFieldsValue())

  // 以管理员身份登录
  const loginAsAdmin = () => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      username: AuthUtils.DEFAULT_ADMIN_USERNAME,
      password: AuthUtils.DEFAULT_ADMIN_PASSWORD
    })
    handleLogin(form.getFieldsValue())
  }

  // 以访客身份登录
  const loginAsVisitor = () => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      username: AuthUtils.DEFAULT_VISITOR_USERNAME,
      password: AuthUtils.DEFAULT_VISITOR_PASSWORD
    })
    handleLogin(form.getFieldsValue())
  }

  // 忘记密码
  const handleForgotPassword = () => navigate('/forgot-password')

  // 注册
  const handleSignup = () => navigate('/signup')

  return (
    <div className="absolute inset-0 m-auto flex h-fit w-[360px] max-w-[90%] flex-col rounded-lg bg-[#ffffff] p-8 shadow-md transition-colors dark:bg-[#222222]">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-medium">{AppMetadata.APP_NAME}</span>
        <span className="mb-4 mt-2">🎉 {t('AUTH:LOGIN.WELCOME.BACK')}</span>
      </div>

      <AForm
        name="login"
        form={form}
        initialValues={{
          username: '',
          password: '',
          rememberPassword: false
        }}
        onFinish={handleLogin}
        autoComplete="off"
        disabled={loginMutation.isPending}
      >
        <AForm.Item
          name="username"
          rules={[{ required: true, message: t('VALIDATION:USERNAME') }]}
          rootClassName="!mb-4"
        >
          <AInput
            prefix={
              <Icon
                icon="mdi:shield-account-outline"
                width={20}
                color="#999999"
              />
            }
            placeholder={t('USER:Username')}
            autoComplete="username"
            allowClear
          />
        </AForm.Item>
        <AForm.Item
          name="password"
          rules={[{ required: true, message: t('VALIDATION:PASSWORD') }]}
          rootClassName="!mb-2"
        >
          <AInput.Password
            prefix={
              <Icon
                icon="mdi:shield-lock-outline"
                width={20}
                color="#999999"
              />
            }
            placeholder={t('USER:Password')}
            autoComplete="current-password"
          />
        </AForm.Item>

        <div className="text-grey-300 mb-1 flex items-center justify-between">
          <AForm.Item
            name="rememberPassword"
            valuePropName="checked"
            rootClassName="!mb-0"
          >
            <ACheckbox>{t('COMMON:ConfirmPassword')}</ACheckbox>
          </AForm.Item>

          <AForm.Item rootClassName="!mb-0">
            <AConfigProvider theme={{ components: { Button: { paddingInlineSM: 0 } } }}>
              <AButton
                size="small"
                type="link"
                onClick={handleForgotPassword}
              >
                <span className="text-xs font-semibold underline-offset-4 hover:underline">
                  {t('COMMON:ForgotPassword')}
                </span>
              </AButton>
            </AConfigProvider>
          </AForm.Item>
        </div>

        <AForm.Item rootClassName="!mb-2">
          <div className="flex flex-col space-y-2">
            <AButton
              type="primary"
              disabled={loginMutation.isPending}
              loading={loginMutation.isPending}
              onClick={loginAsBasic}
            >
              {t('COMMON:Menu.Login')}
            </AButton>

            <ADivider />

            <div className="flex flex-1 space-x-2">
              <AButton
                className="w-[calc(50%-4px)]"
                disabled={loginMutation.isPending}
                loading={loginMutation.isPending}
                onClick={loginAsAdmin}
              >
                {t('AUTH:LOGIN.AS.ADMIN')}
              </AButton>
              <AButton
                className="w-[calc(50%-4px)]"
                disabled={loginMutation.isPending}
                loading={loginMutation.isPending}
                onClick={loginAsVisitor}
              >
                {t('AUTH:LOGIN.AS.VISITOR')}
              </AButton>
            </div>
          </div>
        </AForm.Item>

        <div className="flex items-center space-x-1 text-xs">
          <span>{t('AUTH:LOGIN.NEED.ACCOUNT')}</span>
          <AConfigProvider theme={{ components: { Button: { paddingInlineSM: 0 } } }}>
            <AButton
              size="small"
              type="link"
              onClick={handleSignup}
            >
              <span className="text-xs font-semibold underline-offset-4 hover:underline">
                {t('COMMON:Menu.Signup')}
              </span>
            </AButton>
          </AConfigProvider>
        </div>

        <ADivider className="!text-xs">{t('AUTH:LOGIN.THIRD.PARTY')}</ADivider>

        <div className="flex flex-col space-y-2">
          <AButton
            className="!flex items-center justify-center !bg-[#595d5f] !text-white dark:bg-[#333333] dark:hover:!border-transparent"
            icon={
              <Icon
                icon="mdi:github"
                width={20}
              />
            }
          >
            {t('AUTH:LOGIN.WITH.GITHUB')}
          </AButton>
          <AButton
            className="!flex items-center justify-center"
            icon={
              <Icon
                icon="logos:google-icon"
                width={16}
              />
            }
          >
            {t('AUTH:LOGIN.WITH.GOOGLE')}
          </AButton>
        </div>
      </AForm>
    </div>
  )
}
