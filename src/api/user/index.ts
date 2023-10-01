import type {
  BaseResponse,
  PageRequestModel,
  PageResponse,
  User
} from '@/types'

import Request from '../axios'

export class UserAPI {
  private static USER_API_PREFIX = `${GlobalEnvConfig.MOCK_API_PREFIX}/users`

  /**
   * 用户列表
   */
  static getUsers(params: PageRequestModel) {
    return Request.get<PageResponse<User[]>>(this.USER_API_PREFIX, {
      ...params
    })
  }

  /**
   * 用户信息
   */
  static getUser(id: number) {
    return Request.get<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}`)
  }
}
