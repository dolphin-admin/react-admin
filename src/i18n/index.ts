import { Lang } from '@dolphin-admin/utils'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { EN_US, ZH_CN } from '@/locales'

const resources = {
  [Lang['en-US']]: EN_US,
  [Lang['zh-CN']]: ZH_CN
}

const ns = Object.keys(resources[Lang['en-US']])

i18n.use(initReactI18next).init({
  lng: LangUtils.getDefaultLang(),
  fallbackLng: 'en-US',
  ns,
  defaultNS: 'GLOBAL',
  resources,
  interpolation: {
    escapeValue: false
  }
})

export default i18n
