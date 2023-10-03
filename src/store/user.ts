import type { User } from '@/types'
import { create } from 'zustand'

interface State {
  user: User | null
}

interface Actions {
  hasData: () => boolean
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<State & Actions>()((set, get) => ({
  /**
   * 当前登录系统的用户数据
   */
  user: null,
  /**
   * 判断当前用户是否存在
   */
  hasData: () => !!get().user,
  /**
   * 设置当前用户数据，更新方式为”非覆盖式更新“
   * @param data 用户数据
   */
  setUser: (data: User) =>
    set((state) => ({ user: { ...state.user, ...data } })),
  /**
   * 清空当前用户数据
   */
  clearUser: () => set(() => ({ user: null }))
}))
