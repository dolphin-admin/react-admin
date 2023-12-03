export interface TemplateSetting {
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

export interface CreateTemplateSettingModel {
  key: string
  value: string
  label: any
  remark: any
  enabled: boolean
  builtIn: boolean
  sort: number
}

export interface UpdateTemplateSettingModel extends CreateTemplateSettingModel {}
