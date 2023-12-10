import type { BasePageModel } from '@/constants'
import type { Dictionary, Page, R } from '@/types'

export class DictionaryAPI {
  private static DICTIONARY_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/dictionaries`

  /**
   * 字典列表缓存 key
   */
  static LIST_QUERY_KEY = 'DICTIONARY.LIST'

  /**
   * 字典详情缓存 key
   */
  static DETAIL_QUERY_KEY = 'DICTIONARY.DETAIL'

  /**
   * 字典列表
   */
  static list(params: BasePageModel) {
    return httpRequest.get<R<Page<Dictionary>>>(this.DICTIONARY_API_PREFIX, {
      ...params
    })
  }

  /**
   * 字典详情
   */
  static detail(id: number) {
    return httpRequest.get<R<Dictionary>>(`${this.DICTIONARY_API_PREFIX}/${id}`)
  }

  /**
   * 新增字典
   */
  static create(data: Dictionary) {
    return httpRequest.post<R>(`${this.DICTIONARY_API_PREFIX}`, { ...data })
  }

  /**
   * 更新字典
   */
  static update(id: number, data: Dictionary) {
    return httpRequest.put<R<Dictionary>>(`${this.DICTIONARY_API_PREFIX}/${id}`, { ...data })
  }

  /**
   * 修改字典
   */
  static patch(id: number, data: Partial<Dictionary>) {
    return httpRequest.patch<R>(`${this.DICTIONARY_API_PREFIX}/${id}`, { ...data })
  }

  /**
   * 删除字典
   */
  static delete(id: number) {
    return httpRequest.delete<R>(`${this.DICTIONARY_API_PREFIX}/${id}`)
  }
}
