import { create } from 'zustand'

import type { Theme } from '@/types'

interface State {
  theme: Theme
  enableHappyWorkTheme: boolean
}

interface Actions {
  toggleTheme: () => void
  changeTheme: (theme: Theme) => void
  setHappyWorkTheme: (enable: boolean) => void
  toggleHappyWorkTheme: () => void
}

export const useThemeStore = create<State & Actions>((set, get) => ({
  /**
   * 主题模式
   * @description
   * 可选值：`light` | `dark`
   */
  theme: ThemeUtils.getDefaultTheme(),

  /**
   * 是否开启 antd 快乐工作主题，默认开启
   */
  enableHappyWorkTheme: true,

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
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
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
  }
}))
