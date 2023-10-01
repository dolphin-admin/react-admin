import { create } from 'zustand'

interface State {
  count: number
}

interface Actions {
  increment: (value: number) => void
  decrement: (value: number) => void
}

export const useCounterStore = create<State & Actions>()((set) => ({
  count: 0,
  increment: (value) => set((state) => ({ count: state.count + value })),
  decrement: (value) => set((state) => ({ count: state.count - value }))
}))
