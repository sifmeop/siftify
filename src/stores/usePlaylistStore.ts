import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IPlaylist {
  isOpen: boolean
  setOpen: () => void
}

export const usePlaylistStore = create<IPlaylist>()(
  devtools((set) => ({
    isOpen: false,
    setOpen: () => set((state) => ({ isOpen: !state.isOpen }))
  }))
)
