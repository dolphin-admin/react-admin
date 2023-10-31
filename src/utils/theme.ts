import type { Theme } from '@/types'

export class ThemeUtils {
  /**
   * @description 主题存储键名
   */
  private static LOCAL_STORAGE_THEME = 'theme'

  /**
   * 获取主题
   */
  static getTheme() {
    return localStorage.getItem(this.LOCAL_STORAGE_THEME)
  }

  /**
   * 设置主题
   * @param theme
   */
  static setTheme(theme: Theme) {
    localStorage.setItem(this.LOCAL_STORAGE_THEME, theme)
  }

  /**
   * 清除主题
   */
  static clearTheme() {
    localStorage.removeItem(this.LOCAL_STORAGE_THEME)
  }

  /**
   * 获取默认主题
   */
  static getDefaultThemeMode(): Theme {
    if (
      this.getTheme() === 'dark' ||
      (!this.getTheme() &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      return 'dark'
    }
    return 'light'
  }

  /**
   * 切换主题
   */
  static changeThemeMode(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
      ThemeUtils.setTheme('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
      ThemeUtils.setTheme('light')
    }
  }
}
