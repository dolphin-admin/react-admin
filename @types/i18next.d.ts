import 'i18next'

import type { EN_US } from '../src/locales'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'GLOBAL'
    resources: typeof EN_US
  }
}
