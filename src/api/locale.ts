import type { LocaleResource, R } from '@/types'

export class LocaleAPI {
  private static AUTH_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/locales`

  /**
   * 根据语言获取国际化资源
   */
  static getLocaleResources(lang: string) {
    return httpRequest.get<R<LocaleResource[]>>(`${this.AUTH_API_PREFIX}/${lang}`)
  }
}
