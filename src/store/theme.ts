import { create } from 'zustand'

import type { Theme } from '@/types'

interface State {
  theme: Theme
}

interface Actions {
  toggleTheme: () => void
}

export const useThemeStore = create<State & Actions>((set, get) => ({
  theme: ThemeUtils.getDefaultThemeMode(),
  toggleTheme: () => {
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
    ThemeUtils.changeThemeMode(get().theme)
  }
}))
