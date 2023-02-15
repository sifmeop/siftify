import type { Track } from '@prisma/client'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IQueue {
  list: Track[]
  addToQueue: (track: Track) => void
  removeFromQueue: (id: string) => void
}

export const useQueue = create<IQueue>()(
  devtools((set) => ({
    list: [],
    addToQueue: (track: Track) => {
      set((state) => ({ list: [...state.list, track] }))
    },
    removeFromQueue: (id: string) => {
      set((state) => ({
        list: [...state.list.filter((track) => track.id === id)]
      }))
    }
  }))
)
