import AUTH_en_us from './en_US/auth.json'
import GLOBAL_en_us from './en_US/global.json'
import LAYOUT_en_us from './en_US/layout.json'
import USER_en_us from './en_US/user.json'
import VALIDATION_en_us from './en_US/validation.json'
import AUTH_zh_cn from './zh_CN/auth.json'
import GLOBAL_zh_cn from './zh_CN/global.json'
import LAYOUT_zh_cn from './zh_CN/layout.json'
import USER_zh_cn from './zh_CN/user.json'
import VALIDATION_zh_cn from './zh_CN/validation.json'

export const EN_US = {
  GLOBAL: GLOBAL_zh_cn,
  AUTH: AUTH_zh_cn,
  VALIDATION: VALIDATION_zh_cn,
  LAYOUT: LAYOUT_zh_cn,
  USER: USER_zh_cn
}

export const ZH_CN = {
  GLOBAL: GLOBAL_en_us,
  AUTH: AUTH_en_us,
  VALIDATION: VALIDATION_en_us,
  LAYOUT: LAYOUT_en_us,
  USER: USER_en_us
}
