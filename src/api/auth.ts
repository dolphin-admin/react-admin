import { LoginType } from '@/features/auth'

import type { LoginModel, SignupModel, Tokens } from './auth.type'

export class AuthAPI {
  private static AUTH_API_PREFIX = '/auth'

  static REFRESH_API_URL = `${this.AUTH_API_PREFIX}/refresh`

  /**
   * 登录
   */
  static login(data: LoginModel) {
    return httpRequest.post<Tokens>(
      `${this.AUTH_API_PREFIX}/login`,
      { ...data },
      { params: { type: LoginType.USERNAME } }
    )
  }

  /**
   * 注册
   */
  static signup(data: SignupModel) {
    return httpRequest.post<Tokens>(`${this.AUTH_API_PREFIX}/signup`, {
      ...data
    })
  }

  /**
   * 刷新令牌
   */
  static refresh(token: string) {
    return httpRequest.post<Tokens>(this.REFRESH_API_URL, {}, { params: { token } })
  }

  /**
   * 登出
   */
  static logout() {
    return httpRequest.post(`${this.AUTH_API_PREFIX}/logout`)
  }
}
