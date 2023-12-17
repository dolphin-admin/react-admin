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

export interface CreateDictionaryModel {
  /**
   * 字典编码
   */
  code: string
  /**
   * 是否启用
   */
  enabled: boolean
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
}

export interface UpdateDictionaryModel extends CreateDictionaryModel {}

export interface PatchDictionaryModel {
  /**
   * 字典编码
   */
  code?: string
  /**
   * 是否启用
   */
  enabled?: boolean
  /**
   * 名称
   */
  label?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 排序
   */
  sort?: number
}
