import type { BasePageModel } from '@/constants'

import type { Page } from './axios.type'
import type { CreateUserModel, User } from './user.type'

export class UserAPI {
  private static API_PREFIX = '/users'

  /**
   * 新增用户
   */
  static create(data: CreateUserModel) {
    return httpRequest.post<User>(this.API_PREFIX, { ...data })
  }

  /**
   * 用户列表
   */
  static list(params: BasePageModel) {
    return httpRequest.get<Page<User>>(this.API_PREFIX, { ...params })
  }

  /**
   * 用户信息
   */
  static detail(id: number) {
    return httpRequest.get<User>(`${this.API_PREFIX}/${id}`)
  }

  /**
   * 当前用户
   * @description 通过当前登录用户的 token 获取用户信息
   */
  static profile() {
    return httpRequest.get<User>(`${this.API_PREFIX}/profile`)
  }

  /**
   * 更新用户
   */
  static update(id: number, data: User) {
    return httpRequest.patch<User>(`${this.API_PREFIX}/${id}`, { ...data })
  }
}
