export interface Setting {
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
   * 键
   */
  key: string
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
  /**
   * 值
   */
  value: string
}

export interface CreateSettingModel {
  /**
   * 是否启用
   */
  enabled: boolean
  /**
   * 键
   */
  key: string
  /**
   * 名称
   */
  label: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 值
   */
  value: string
}

export interface UpdateSettingModel extends CreateSettingModel {}

export interface PatchSettingModel {
  /**
   * 是否启用
   */
  enabled?: boolean
  /**
   * 键
   */
  key?: string
  /**
   * 名称
   */
  label?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 值
   */
  value?: string
}
