import type { BasePageModel } from '@/constants'
import type { BaseResponse, PageResponse, Setting } from '@/types'

export class SettingAPI {
  private static SETTING_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/settings`

  /**
   * 设置列表缓存 key
   */
  static LIST_QUERY_KEY = 'SETTING.LIST'

  /**
   * 设置列表
   */
  static list(params: BasePageModel) {
    return httpRequest.get<PageResponse<Setting[]>>(this.SETTING_API_PREFIX, {
      ...params
    })
  }

  /**
   * 启用设置
   */
  static enable(id: number) {
    return httpRequest.patch<BaseResponse>(`${this.SETTING_API_PREFIX}/${id}/enable`)
  }

  /**
   * 禁用设置
   */
  static disable(id: number) {
    return httpRequest.patch<BaseResponse>(`${this.SETTING_API_PREFIX}/${id}/disable`)
  }

  /**
   * 删除设置
   */
  static delete(id: number) {
    return httpRequest.delete<BaseResponse>(`${this.SETTING_API_PREFIX}/${id}`)
  }

  /**
   * 排序设置
   */
  static sort(id: number, targetId: number) {
    return httpRequest.patch<BaseResponse>(`${this.SETTING_API_PREFIX}/${id}/sort/${targetId}`)
  }
}
