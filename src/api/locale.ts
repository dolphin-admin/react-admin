import type { LocaleResource } from '@/types'

export class LocaleAPI {
  private static LOCALE_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/locales`

  /**
   * 英文国际化资源缓存 key
   */
  static EN_US_QUERY_KEY = 'LOCALE.EN.US'

  /**
   * 中文国际化资源缓存 key
   */
  static ZH_CN_QUERY_KEY = 'LOCALE.ZH.CN'

  /**
   * 根据语言获取国际化资源
   */
  static getLocaleResources(lang: string) {
    return httpRequest.get<LocaleResource[]>(`${this.LOCALE_API_PREFIX}/${lang}`)
  }
}
