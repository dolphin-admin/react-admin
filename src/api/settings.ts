import type { BasePageModel } from '@/constants'
import type { CreateSettingModel, Page, R, Setting, UpdateSettingModel } from '@/types'

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
    return httpRequest.get<R<Page<Setting>>>(this.SETTING_API_PREFIX, {
      ...params
    })
  }

  /**
   * 设置详情
   */
  static detail(id: number) {
    return httpRequest.get<R<Setting>>(`${this.SETTING_API_PREFIX}/${id}`)
  }

  /**
   * 新增设置
   */
  static create(data: CreateSettingModel) {
    return httpRequest.get<R>(`${this.SETTING_API_PREFIX}`, { ...data })
  }

  /**
   * 修改设置
   */
  static update(id: number, data: UpdateSettingModel) {
    return httpRequest.get<R<Setting>>(`${this.SETTING_API_PREFIX}/${id}`, { ...data })
  }

  /**
   * 启用设置
   */
  static enable(id: number) {
    return httpRequest.patch<R>(`${this.SETTING_API_PREFIX}/${id}/enable`)
  }

  /**
   * 禁用设置
   */
  static disable(id: number) {
    return httpRequest.patch<R>(`${this.SETTING_API_PREFIX}/${id}/disable`)
  }

  /**
   * 删除设置
   */
  static delete(id: number) {
    return httpRequest.delete<R>(`${this.SETTING_API_PREFIX}/${id}`)
  }

  /**
   * 排序设置
   */
  static sort(id: number, targetId: number) {
    return httpRequest.patch<R>(`${this.SETTING_API_PREFIX}/${id}/sort/${targetId}`)
  }
}
