import { create } from 'zustand'

import type { User } from '@/types'

interface State {
  user: Partial<User>
}

interface Actions {
  hasData: () => boolean
  setUser: (user: Partial<User>) => void
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
   * @description 判断依据：当前用户数据是否存在 ID
   */
  hasData: () => !!get().user.id,

  /**
   * 设置当前用户数据，更新方式为“非覆盖式更新”
   * @param data 用户数据
   */
  setUser: (user: Partial<User>) => set((state) => ({ user: { ...state.user, ...user } })),

  /**
   * 清空当前用户数据
   */
  clearUser: () => set(() => ({ user: {} }))
}))
