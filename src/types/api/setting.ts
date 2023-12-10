export interface Setting {
  id: number
  key: string
  value: string
  label: any
  remark: any
  enabled: boolean
  builtIn: boolean
  sort: number
  settingTrans: any
}

export interface CreateSettingModel {
  key: string
  value: string
  label: any
  remark: any
  enabled: boolean
  builtIn: boolean
  sort: number
}

export interface UpdateSettingModel extends CreateSettingModel {}

export interface PatchSettingModel extends Partial<UpdateSettingModel> {}
