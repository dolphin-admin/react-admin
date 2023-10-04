import 'i18next'
import type { EN_US } from '../src/locales'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'global'
    resources: {
      Global: typeof EN_US.Global
      Auth: typeof EN_US.Auth
      Layout: typeof EN_US.Layout
      User: typeof EN_US.User
      Validation: typeof EN_US.Validation
    }
  }
}
