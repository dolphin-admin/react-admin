import type { BasePageModel } from '@/constants'

import type { Page } from './axios.type'
import type {
  CreateDictionaryModel,
  Dictionary,
  PatchDictionaryModel,
  UpdateDictionaryModel
} from './dictionary.type'

export class DictionaryAPI {
  private static API_PREFIX = '/dictionaries'

  /**
   * 新增字典
   */
  static create(data: CreateDictionaryModel) {
    return httpRequest.post<Dictionary>(this.API_PREFIX, { ...data })
  }

  /**
   * 字典列表
   */
  static list(params: BasePageModel, signal?: AbortSignal) {
    return httpRequest.get<Page<Dictionary>>(this.API_PREFIX, { ...params }, { signal })
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
   * 部分更新
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
