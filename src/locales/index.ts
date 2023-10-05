import en_auth from '@/locales/en_us/auth.json'
import en_global from '@/locales/en_us/global.json'
import en_layout from '@/locales/en_us/layout.json'
import en_user from '@/locales/en_us/user.json'
import en_validation from '@/locales/en_us/validation.json'
import zh_cn_auth from '@/locales/zh_cn/auth.json'
import zh_cn_global from '@/locales/zh_cn/global.json'
import zh_cn_layout from '@/locales/zh_cn/layout.json'
import zh_cn_user from '@/locales/zh_cn/user.json'
import zh_cn_validation from '@/locales/zh_cn/validation.json'

export const EN_US = {
  Global: en_global,
  Auth: en_auth,
  Layout: en_layout,
  User: en_user,
  Validation: en_validation
} as const

export const ZH_CN = {
  Global: zh_cn_global,
  Auth: zh_cn_auth,
  Layout: zh_cn_layout,
  User: zh_cn_user,
  Validation: zh_cn_validation
} as const
