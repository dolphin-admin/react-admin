import type { Tokens } from '@/api/auth.type'

export const useHandleLoginResult = () => {
  const handleLoginResult = (tokens: Tokens) => {
    const { accessToken, refreshToken } = tokens ?? {}
    // 保存 token 和用户信息
    AuthUtils.setAccessToken(accessToken)
    AuthUtils.setRefreshToken(refreshToken)
  }

  return { handleLoginResult }
}
