import type { BasePageModel } from '@/constants'
import type { BaseResponse, PageResponse, Setting } from '@/types'
import type { CreateTemplateSettingModel, UpdateTemplateSettingModel } from '@/types/api/template'

export class TemplateAPI {
  private static SETTING_API_PREFIX = `${GlobalEnvConfig.MOCK_API_PREFIX}/settings`

  /**
   * 设置列表缓存 key
   */
  static LIST_QUERY_KEY = 'TEMPLATE.SETTING.LIST'

  /**
   * 模版设置列表
   */
  static list(params: BasePageModel) {
    return httpRequest.get<PageResponse<Setting[]>>(this.SETTING_API_PREFIX, {
      ...params
    })
  }

  /**
   * 模版设置详情
   */
  static detail(id: number) {
    return httpRequest.get<BaseResponse<Setting>>(`${this.SETTING_API_PREFIX}/${id}`)
  }

  /**
   * 新增模版设置
   */
  static create(data: CreateTemplateSettingModel) {
    return httpRequest.get<BaseResponse<Setting>>(`${this.SETTING_API_PREFIX}`, { ...data })
  }

  /**
   * 修改模版设置
   */
  static update(id: number, data: UpdateTemplateSettingModel) {
    return httpRequest.get<BaseResponse<Setting>>(`${this.SETTING_API_PREFIX}/${id}`, { ...data })
  }

  /**
   * 启用模版设置
   */
  static enable(id: number) {
    return httpRequest.patch<BaseResponse>(`${this.SETTING_API_PREFIX}/${id}/enable`)
  }

  /**
   * 禁用模版设置
   */
  static disable(id: number) {
    return httpRequest.patch<BaseResponse>(`${this.SETTING_API_PREFIX}/${id}/disable`)
  }

  /**
   * 删除模版设置
   */
  static delete(id: number) {
    return httpRequest.delete<BaseResponse>(`${this.SETTING_API_PREFIX}/${id}`)
  }
}
