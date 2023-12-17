import type { BasePageModel } from '@/constants'
import type {
  CreateDictionaryModel,
  Dictionary,
  Page,
  PatchDictionaryModel,
  UpdateDictionaryModel
} from '@/types'

export class DictionaryAPI {
  private static API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/dictionaries`

  /**
   * 字典列表缓存 key
   */
  static LIST_QUERY_KEY = 'DICTIONARY.LIST'

  /**
   * 字典详情缓存 key
   */
  static DETAIL_QUERY_KEY = 'DICTIONARY.DETAIL'

  /**
   * 新增字典
   */
  static create(data: CreateDictionaryModel) {
    return httpRequest.post<Dictionary>(`${this.API_PREFIX}`, { ...data })
  }

  /**
   * 字典列表
   */
  static list(params: BasePageModel) {
    return httpRequest.get<Page<Dictionary>>(this.API_PREFIX, { ...params })
  }

  /**
   * 字典详情
   */
  static detail(id: number) {
    return httpRequest.get<Dictionary>(`${this.API_PREFIX}/${id}`)
  }

  /**
   * 更新字典
   */
  static update(id: number, data: UpdateDictionaryModel) {
    return httpRequest.put<Dictionary>(`${this.API_PREFIX}/${id}`, { ...data })
  }

  /**
   * 修改字典
   */
  static patch(id: number, data: PatchDictionaryModel) {
    return httpRequest.patch<Dictionary>(`${this.API_PREFIX}/${id}`, { ...data })
  }

  /**
   * 删除字典
   */
  static delete(id: number) {
    return httpRequest.delete(`${this.API_PREFIX}/${id}`)
  }
}
