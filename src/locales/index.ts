import AUTH from './auth/en-US.json'
import COMMON from './common/en-US.json'
import DICTIONARY from './dictionary/en-US.json'
import LAYOUT from './layout/en-US.json'
import MENU from './menu/en-US.json'
import USER from './user/en-US.json'
import VALIDATION from './validation/en-US.json'

/**
 * 用于给 `@types/i18next.d.ts` 提供类型定义
 * @see https://www.i18next.com/overview/typescript
 */
const resources = {
  COMMON,
  AUTH,
  VALIDATION,
  LAYOUT,
  MENU,
  USER,
  DICTIONARY
}
export default resources
