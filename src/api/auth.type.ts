export interface LoginModel {
  /**
   * 密码
   */
  password: string
  /**
   * 用户名
   */
  username: string
}

export interface SignupModel extends LoginModel {
  /**
   * 确认密码
   */
  confirmPassword: string
}

export interface Tokens {
  /**
   * 访问令牌
   */
  accessToken: string
  /**
   * 刷新令牌
   */
  refreshToken: string
}

export interface ChangePasswordModel {
  /**
   * 旧密码
   */
  oldPassword: string
  /**
   * 新密码
   */
  newPassword: string
  /**
   * 确认密码
   */
  confirmPassword: string
}
