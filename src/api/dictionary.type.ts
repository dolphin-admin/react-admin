import type { Nullable } from '@dolphin-admin/utils'

import { BasePageModel } from '@/constants'

export interface Dictionary {
  /**
   * 字典编码
   */
  code: string
  /**
   * 创建时间
   */
  createdAt: Date
  /**
   * 创建人
   */
  createdBy: number | null
  /**
   * 是否启用
   */
  enabled: boolean
  /**
   * ID
   */
  id: number
  /**
   * 名称
   */
  label: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 排序
   */
  sort?: number
  /**
   * 更新时间
   */
  updatedAt: Date
  /**
   * 更新人
   */
  updatedBy: number | null
}

export class DictionaryPageModel extends BasePageModel {
  code?: string

  label?: string

  enabled?: Nullable<boolean>

  constructor(dictionaryPageModel: DictionaryPageModel) {
    const { code, label, enabled, ...basePageModel } = dictionaryPageModel ?? {}
    super(basePageModel)
    this.code = code
    this.label = label
    this.enabled = enabled
  }
}

export type CreateDictionaryModel = Pick<
  Dictionary,
  'code' | 'enabled' | 'label' | 'remark' | 'sort'
>

export type UpdateDictionaryModel = CreateDictionaryModel

export type PatchDictionaryModel = Partial<CreateDictionaryModel>
