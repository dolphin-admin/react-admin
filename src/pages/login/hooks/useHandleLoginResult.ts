import type { UserToken } from '@/types'

export const useHandleLoginResult = () => {
  const userStore = useUserStore()
  const { message } = AApp.useApp()

  const handleLoginResult = (userToken: UserToken, msg: string) => {
    const { accessToken, refreshToken, user } = userToken ?? {}
    // 保存 token 和用户信息
    AuthUtils.setAccessToken(accessToken)
    AuthUtils.setRefreshToken(refreshToken)
    userStore.setUser(user)
    // 提示登录成功
    message.success(msg)
  }

  return { handleLoginResult }
}
