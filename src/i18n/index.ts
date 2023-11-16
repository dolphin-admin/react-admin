import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: LangUtils.getDefaultLang(), // 默认语言
  fallbackLng: 'en-US',
  defaultNS: 'GLOBAL',
  ns: [], // 动态加载命名空间
  interpolation: {
    escapeValue: false
  }
})

// i18n 实例声明后，再动态读取 /locales 下的资源文件
dynamicLoadTrans().then((trans) => {
  trans.forEach(([lang, key, translationData]) => {
    i18n.addResourceBundle(lang, key, translationData)
  })
})

/**
 * 动态加载 i18n 资源文件
 * @description 读取 /locales 下的全部 JSON 文件
 * - 转化成 i18n 资源数组，格式如 [语言 key, 命名空间 key, 资源文件内容]
 * - 通过 import.meta.glob 实现
 * @see {@link https://vitejs.dev/guide/features.html#glob-import}
 */
async function dynamicLoadTrans() {
  const translations = Object.entries(
    import.meta.glob<{ default: unknown }>('../locales/**/*.json', { eager: true })
  ).map(async ([path, translation]) => [
    path.split('/')[2].replace('_', '-'),
    path.match(/([^/]+)\.json$/)![1].toUpperCase(),
    translation.default
  ]) as Promise<[string, string, Record<string, string>]>[]

  const transResult = await Promise.all(translations)

  return transResult
}

export default i18n
