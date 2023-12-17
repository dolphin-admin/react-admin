import { LoginType } from '@/enums'
import type { LoginModel, SignupModel, UserToken } from '@/types'

export class AuthAPI {
  private static AUTH_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/auth`

  static REFRESH_API_URL = `${this.AUTH_API_PREFIX}/refresh`

  /**
   * 登录
   */
  static login(data: LoginModel) {
    return httpRequest.post<UserToken>(
      `${this.AUTH_API_PREFIX}/login`,
      { ...data },
      { params: { type: LoginType.USERNAME } }
    )
  }

  /**
   * 注册
   */
  static signup(data: SignupModel) {
    return httpRequest.post<UserToken>(`${this.AUTH_API_PREFIX}/signup`, { ...data })
  }

  /**
   * 刷新令牌
   */
  static async refresh(token: string) {
    return httpRequest.post<UserToken>(this.REFRESH_API_URL, {}, { params: { token } })
  }
}
