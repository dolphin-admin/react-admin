import AUTH_en_us from './en_US/auth.json'
import GLOBAL_en_us from './en_US/global.json'
import LAYOUT_en_us from './en_US/layout.json'
import USER_en_us from './en_US/user.json'
import VALIDATION_en_us from './en_US/validation.json'

/**
 * 用于给 `@types/i18next.d.ts` 提供类型定义
 * @see https://www.i18next.com/overview/typescript
 */
export const EN_US = {
  GLOBAL: GLOBAL_en_us,
  AUTH: AUTH_en_us,
  VALIDATION: VALIDATION_en_us,
  LAYOUT: LAYOUT_en_us,
  USER: USER_en_us
}
