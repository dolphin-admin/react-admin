import 'i18next'

import type EN_US from '../src/locales'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'COMMON'
    resources: typeof EN_US
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface i18n {
    rt: (key: string) => string
  }
}
