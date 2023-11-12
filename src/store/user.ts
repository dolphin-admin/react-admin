import { create } from 'zustand'

import type { User } from '@/types'

interface State {
  user: User
}

interface Actions {
  hasData: () => boolean
  setUser: (user: User) => void
  clearUser: () => void
}

const initialState: State = {
  /**
   * 当前登录系统的用户数据
   */
  user: {}
}

export const useUserStore = create<State & Actions>()((set, get) => ({
  ...initialState,

  /**
   * 判断当前用户是否存在
   */
  hasData: () => !!get().user,

  /**
   * 设置当前用户数据，更新方式为“非覆盖式更新”
   * @param data 用户数据
   */
  setUser: (user: User) => set((state) => ({ user: user ? { ...state.user, ...user } : {} })),

  /**
   * 清空当前用户数据
   */
  clearUser: () => set(() => ({ user: {} }))
}))
