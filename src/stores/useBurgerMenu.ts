import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IBurgerMenu {
  isOpen: boolean
  setOpen: () => void
}

export const useBurgerMenu = create<IBurgerMenu>()(
  devtools((set) => ({
    isOpen: false,
    setOpen: () => set((state) => ({ isOpen: !state.isOpen }))
  }))
)
