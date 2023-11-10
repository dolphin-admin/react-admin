import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { EN_US, ZH_CN } from '@/locales'
import type { Lang } from '@/types'

export const resources = {
  en_US: EN_US,
  zh_CN: ZH_CN
} as const

const ns = ['Global', 'Auth', 'Layout', 'User', 'Validation'] as const

i18n.use(initReactI18next).init({
  lng: LangUtils.getDefaultLang(),
  fallbackLng: 'zh_CN',
  ns,
  defaultNS: 'Global',
  resources,
  interpolation: {
    escapeValue: false
  }
})

export const changeLanguage = async (lang: Lang) => {
  await i18n.changeLanguage(lang)
}

export default i18n
