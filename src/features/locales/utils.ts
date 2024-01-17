import type { LocaleResource } from '@/api/locale.type'

export const processLocaleResources = (lang: string, localeResources: LocaleResource[]) => {
  localeResources.forEach(({ ns, resources }) =>
    // NOTE: i18n.addResources 不会工作，可能是由于 JSON 键前缀重合导致的
    i18n.addResourceBundle(lang, ns, resources, true, true)
  )
}
