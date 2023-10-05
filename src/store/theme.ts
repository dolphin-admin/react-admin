import { create } from 'zustand'

import type { Theme } from '@/types'

interface State {
  theme: Theme
}

interface Actions {
  toggleTheme: () => void
}

export const useThemeStore = create<State & Actions>((set, get) => ({
  /**
   * 主题模式
   * @description
   * 可选值：`light` | `dark`
   */
  theme: ThemeUtils.getDefaultThemeMode(),

  /**
   * 切换主题模式
   */
  toggleTheme: () => {
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
    ThemeUtils.changeThemeMode(get().theme)
  }
}))
