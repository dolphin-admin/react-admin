import type { BasePageModel } from '@/constants'
import type {
  CreateSettingModel,
  Page,
  PatchSettingModel,
  Setting,
  UpdateSettingModel
} from '@/types'

export class SettingAPI {
  private static API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/settings`

  /**
   * 设置列表缓存 key
   */
  static LIST_QUERY_KEY = 'SETTING.LIST'

  /**
   * 设置详情缓存 key
   */
  static DETAIL_QUERY_KEY = 'SETTING.DETAIL'

  /**
   * 新增设置
   */
  static create(data: CreateSettingModel) {
    return httpRequest.get<Setting>(`${this.API_PREFIX}`, { ...data })
  }

  /**
   * 设置列表
   */
  static list(params: BasePageModel) {
    return httpRequest.get<Page<Setting>>(this.API_PREFIX, {
      ...params
    })
  }

  /**
   * 设置详情
   */
  static detail(id: number) {
    return httpRequest.get<Setting>(`${this.API_PREFIX}/${id}`)
  }

  /**
   * 更新设置
   */
  static update(id: number, data: UpdateSettingModel) {
    return httpRequest.get<Setting>(`${this.API_PREFIX}/${id}`, { ...data })
  }

  /**
   * 修改设置
   */
  static patch(id: number, data: PatchSettingModel) {
    return httpRequest.patch<Setting>(`${this.API_PREFIX}/${id}`, { ...data })
  }

  /**
   * 删除设置
   */
  static delete(id: number) {
    return httpRequest.delete(`${this.API_PREFIX}/${id}`)
  }
}
