export class AuthUtils {
  /**
   * token LocalStorage 键名
   */
  private static LOCAL_STORAGE_TOKEN = 'access_token'

  /**
   * 获取 token
   */
  static getToken() {
    return localStorage.getItem(this.LOCAL_STORAGE_TOKEN)
  }

  /**
   * 获取 authorization
   */
  static getAuthorization() {
    return `Bearer ${this.getToken()}`
  }

  /**
   * 设置 token
   * @param token
   */
  static setToken(token: string) {
    localStorage.setItem(this.LOCAL_STORAGE_TOKEN, token)
  }

  /**
   * 清除 token
   */
  static clearToken() {
    localStorage.removeItem(this.LOCAL_STORAGE_TOKEN)
  }

  /**
   * 判断当前是否已经登录
   */
  static isAuthenticated(): boolean {
    return !!localStorage.getItem(this.LOCAL_STORAGE_TOKEN)
  }
}
