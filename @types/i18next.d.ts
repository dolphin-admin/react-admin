import 'i18next'

import type { resources } from '../src/i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'Global'
    resources: (typeof resources)['en_US']
  }
}
