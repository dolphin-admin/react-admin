import { Theme } from '@dolphin-admin/utils'
import type { ThemeConfig } from 'antd'
import { produce } from 'immer'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import { themeDarkConfig, themeLightConfig } from '@/constants'

interface State {
  theme: Theme
  enableHappyWorkTheme: boolean
  themeLightConfig: ThemeConfig
  themeDarkConfig: ThemeConfig
}

interface Actions {
  isLightTheme: () => boolean
  isDarkTheme: () => boolean
  toggleTheme: () => void
  changeTheme: (theme: Theme) => void
  setHappyWorkTheme: (enable: boolean) => void
  toggleHappyWorkTheme: () => void
  changeFontFamily: (currentFontFamily: string) => void
  fontFamily: () => string | undefined
}

const initialState: State = {
  /**
   * 主题 全局亮色主题配置项
   */
  themeLightConfig,
  /**
   * 主题 全局暗色主题配置项
   */
  themeDarkConfig,
  /**
   * 主题模式
   * @description
   * 可选值：`light` | `dark`
   */
  theme: ThemeUtils.getDefaultTheme(),

  /**
   * 是否开启 antd 快乐工作主题，默认开启
   */
  enableHappyWorkTheme: true
}

export const useThemeStore = create<State & Actions>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,

    /**
     * 是否为亮色主题
     */
    isLightTheme: () => get().theme === Theme.LIGHT,

    /**
     * 是否为暗色主题
     */
    isDarkTheme: () => get().theme === Theme.DARK,

    /**
     * 修改主题模式
     * @description
     * - 切换主题模式时，会自动添加或移除 document 上 `dark` 类名
     * - 将主题模式存储到 localStorage 中，以便下次打开页面时读取
     */
    changeTheme: (theme: Theme) => {
      set({ theme })
      ThemeUtils.changeTheme(theme)
    },

    /**
     * 切换主题模式
     */
    toggleTheme: () => {
      set(() => ({ theme: get().isLightTheme() ? Theme.DARK : Theme.LIGHT }))
      ThemeUtils.changeTheme(get().theme)
    },

    /**
     * 启用/禁用快乐工作主题
     */
    setHappyWorkTheme: (enable: boolean) => {
      set({ enableHappyWorkTheme: enable })
    },

    /**
     * 切换快乐工作主题
     */
    toggleHappyWorkTheme: () => {
      set((state) => ({ enableHappyWorkTheme: !state.enableHappyWorkTheme }))
    },

    /**
     * 字体
     */

    fontFamily: () => get().themeLightConfig.token?.fontFamily,

    /**
     * 切换字体
     * @param currentFontFamily
     */
    changeFontFamily: (currentFontFamily: string) => {
      set(
        produce((draft) => {
          draft.themeLightConfig.token!.fontFamily = currentFontFamily
          draft.themeDarkConfig.token!.fontFamily = currentFontFamily
        })
      )
    }
  }))
)

/**
 * 监听主题改变
 * @description
 * - 切换主题模式时，会自动添加或移除 document 上 `dark` 类名
 * - 将主题模式存储到 localStorage 中，以便下次打开页面时读取
 */
useThemeStore.subscribe(
  (state) => state.theme,
  (theme) => {
    ThemeUtils.changeTheme(theme)
  },
  {
    fireImmediately: true
  }
)
