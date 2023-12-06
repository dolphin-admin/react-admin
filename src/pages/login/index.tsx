import type { LoginModel, R, UserToken } from '@/types'
import UsernameIcon from '~icons/mdi/shield-account-outline'
import PasswordIcon from '~icons/mdi/shield-lock-outline'

import { Header, ThirdPartyLogin } from './components'
import { UserNameLoginType } from './enum'
import { useHandleLoginResult, useLoginForm, useRedirect } from './hooks'
import type { LoginFormData } from './types'

export function Component() {
  const { t } = useTranslation(['AUTH', 'VALIDATION', 'USER'])
  const { handleLoginResult } = useHandleLoginResult()
  const { handleRedirect, handleForgotPassword, handleSignup } = useRedirect()
  const { loginForm, clearPassword, setAdminAccount, setVisitorAccount, handleRememberPassword } =
    useLoginForm()

  // 登录请求
  const loginMutation = useMutation({
    mutationFn: (data: LoginModel) => AuthAPI.login(data),
    onSuccess: onLoginSuccess,
    onError: clearPassword
  })

  // 登录表单验证
  const handleLoginForm = (values: LoginFormData) => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { rememberPassword, ...loginData } = values
    loginMutation.mutate(loginData)
  }

  // 登录
  const handleLogin = (type: UserNameLoginType) => {
    switch (type) {
      // 管理员登录
      case UserNameLoginType.ADMIN:
        setAdminAccount()
        break
      // 访客登录
      case UserNameLoginType.VISITOR:
        setVisitorAccount()
        break
      // 普通登录
      case UserNameLoginType.BASIC:
      default:
        break
    }
    handleLoginForm(loginForm.getFieldsValue())
  }

  // 登录成功
  function onLoginSuccess(res: R<UserToken>) {
    const { data, msg } = res ?? {}
    // 处理登录结果
    handleLoginResult(data, msg)
    // 记住密码写入 localStorage
    handleRememberPassword()
    // 处理重定向
    handleRedirect()
  }

  return (
    <div className="absolute inset-0 m-auto flex h-fit w-[360px] max-w-[90%] flex-col rounded-lg bg-[#ffffff] p-8 shadow-md dark:bg-[#222222]">
      <Header />

      <AForm
        name="login"
        form={loginForm}
        initialValues={{
          username: '',
          password: '',
          rememberPassword: false
        }}
        onFinish={handleLoginForm}
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
              <AIcon
                component={() => (
                  <UsernameIcon
                    className="text-muted"
                    fontSize={16}
                  />
                )}
              />
            }
            placeholder={t('USER:USERNAME')}
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
              <AIcon
                component={() => (
                  <PasswordIcon
                    className="text-muted"
                    fontSize={16}
                  />
                )}
              />
            }
            placeholder={t('USER:PASSWORD')}
            autoComplete="current-password"
          />
        </AForm.Item>

        <div className="text-grey-300 mb-1 flex items-center justify-between">
          <AForm.Item
            name="rememberPassword"
            valuePropName="checked"
            rootClassName="!mb-0"
          >
            <ACheckbox>{t('USER:CONFIRM.PASSWORD')}</ACheckbox>
          </AForm.Item>

          <AForm.Item rootClassName="!mb-0">
            <AConfigProvider theme={{ components: { Button: { paddingInlineSM: 0 } } }}>
              <AButton
                size="small"
                type="link"
                onClick={handleForgotPassword}
              >
                <span className="text-xs font-semibold underline-offset-4 hover:underline">
                  {t('FORGOT.PASSWORD')}
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
              onClick={() => handleLogin(UserNameLoginType.BASIC)}
            >
              {t('LOGIN')}
            </AButton>

            <ADivider />

            <div className="flex flex-1 space-x-2">
              <AButton
                className="w-[calc(50%-4px)]"
                disabled={loginMutation.isPending}
                loading={loginMutation.isPending}
                onClick={() => handleLogin(UserNameLoginType.ADMIN)}
              >
                {t('LOGIN.AS.ADMIN')}
              </AButton>
              <AButton
                className="w-[calc(50%-4px)]"
                disabled={loginMutation.isPending}
                loading={loginMutation.isPending}
                onClick={() => handleLogin(UserNameLoginType.VISITOR)}
              >
                {t('LOGIN.AS.VISITOR')}
              </AButton>
            </div>
          </div>
        </AForm.Item>

        <div className="flex items-center space-x-1 text-xs">
          <span>{t('NEED.ACCOUNT')}</span>
          <AConfigProvider theme={{ components: { Button: { paddingInlineSM: 0 } } }}>
            <AButton
              size="small"
              type="link"
              onClick={handleSignup}
            >
              <span className="text-xs font-semibold underline-offset-4 hover:underline">
                {t('SIGN.UP')}
              </span>
            </AButton>
          </AConfigProvider>
        </div>

        <ThirdPartyLogin />
      </AForm>
    </div>
  )
}
