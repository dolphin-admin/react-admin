import type { BaseResponse, LoginModel, SignupModel, UserTokenResponse } from '@/types'

import Request from './axios'

// 登录类型
enum LoginType {
  USERNAME = 1, // 用户名登录
  EMAIL = 2 // 邮箱登录
}

export class AuthAPI {
  private static AUTH_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/auth`

  /**
   * 登录
   */
  static login(data: LoginModel) {
    return Request.post<BaseResponse<UserTokenResponse>>(
      `${this.AUTH_API_PREFIX}/login`,
      { ...data },
      { params: { type: LoginType.USERNAME } }
    )
  }

  /**
   * 注册
   */
  static signup(data: SignupModel) {
    return Request.post<BaseResponse<UserTokenResponse>>(`${this.AUTH_API_PREFIX}/signup`, {
      ...data
    })
  }

  /**
   * GitHub 登录
   */
  static loginWithGitHub(code: string) {
    return Request.post<BaseResponse<UserTokenResponse>>(`${this.AUTH_API_PREFIX}/login/github`, {
      code
    })
  }

  /**
   * Google 登录
   */
  static loginWithGoogle(code: string) {
    return Request.post<BaseResponse<UserTokenResponse>>(`${this.AUTH_API_PREFIX}/login/google`, {
      code
    })
  }
}
