import type { LoginModel, Tokens } from '@/types'

import { Header, ThirdPartyLogin } from './components'
import { UserNameLoginType } from './enum'
import { useHandleLoginResult, useLoginForm, useRedirect } from './hooks'

export function Component() {
  const { t } = useTranslation(['AUTH', 'VALIDATION', 'USER'])
  const { handleLoginResult } = useHandleLoginResult()
  const { handleRedirect, handleForgotPassword, handleSignup } = useRedirect()
  const { loginForm, clearPassword, handleAutoComplete, handleRememberPassword } = useLoginForm()

  // 登录请求
  const loginMutation = useMutation({
    mutationFn: (data: LoginModel) => AuthAPI.login(data),
    onSuccess: onLoginSuccess,
    onError: clearPassword
  })

  // 登录
  const handleLogin = (type: UserNameLoginType) => {
    handleAutoComplete(type)
    loginForm.submit()
  }

  // 登录成功
  function onLoginSuccess(data: Tokens) {
    // 处理登录结果
    handleLoginResult(data)
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
        onFinish={(values) => loginMutation.mutate(values)}
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
              <DpIcon
                type="Account"
                depth={3}
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
              <DpIcon
                type="Lock"
                depth={3}
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
