import { create } from 'zustand'

interface State {
  isCollapse: boolean
  isDisplay: boolean
}

interface Actions {
  setIsCollapse: (isCollapse: boolean) => void
  toggleCollapse: () => void
  setIsDisplay: (isDisplay: boolean) => void
  toggleDisplay: () => void
}

export const useSidebarStore = create<State & Actions>((set) => ({
  /**
   * 是否折叠侧边栏，默认不折叠
   */
  isCollapse: false,

  /**
   * 是否显示侧边栏，默认显示
   */
  isDisplay: !BrowserUtils.isMobileDevice(),

  /**
   * 修改折叠状态
   */
  setIsCollapse: (isCollapse) => set(() => ({ isCollapse })),

  /**
   * 切换折叠状态
   */
  toggleCollapse: () => set((state) => ({ isCollapse: !state.isCollapse })),

  /**
   * 修改显示状态
   */
  setIsDisplay: (isDisplay) => set(() => ({ isDisplay })),

  /**
   * 切换显示状态
   */
  toggleDisplay: () => set((state) => ({ isDisplay: !state.isDisplay }))
}))
