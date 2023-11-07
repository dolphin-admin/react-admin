import { Lang } from '@dolphin-admin/utils'
import type { Locale } from 'antd/lib/locale'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'

export class AntdUtils {
  /**
   * 获取 antd 默认语言
   */
  static getDefaultLocale(): Locale {
    const lang = LangUtils.getDefaultLang()
    switch (lang) {
      case Lang['zh-CN']:
        return zhCN
      case Lang['en-US']:
        return enUS
      default:
        return zhCN
    }
  }
}
