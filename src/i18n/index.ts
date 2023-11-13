import { Lang } from '@dolphin-admin/utils'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

/**
 * 动态加载 i18n 资源文件
 */
const dynamicLoadTrans = async () => {
  const result: Record<string, any> = {}
  const translations = Object.entries(import.meta.glob('../locales/**/*.json')).map(
    async ([path, translation]) => [
      path.split('/')[2].replace('_', '-'),
      path.match(/([^/]+)\.json$/)![1].toUpperCase(),
      await translation()
    ]
  ) as Promise<[string, string, () => Promise<{ default: Record<string, string> }>]>[]

  const resolvedTranslations = await Promise.all(translations)

  resolvedTranslations.forEach(([lang, key, translationData]) => {
    if (!result[lang]) {
      result[lang] = {}
    }
    result[lang][key] = translationData
  })

  return result
}

export const resources = await dynamicLoadTrans()

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
