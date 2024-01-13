import type { Tokens } from '@/types'

export const useHandleLoginResult = () => {
  const { message } = AApp.useApp()

  const handleLoginResult = (tokens: Tokens, msg: string) => {
    const { accessToken, refreshToken } = tokens ?? {}
    // 保存 token 和用户信息
    AuthUtils.setAccessToken(accessToken)
    AuthUtils.setRefreshToken(refreshToken)
    // 提示登录成功
    message.success(msg)
  }

  return { handleLoginResult }
}
