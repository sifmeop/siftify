import type { Track } from '@prisma/client'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { usePlayer } from './usePlayer'

type QueryId = {
  query_id: number
}

interface IQueue {
  shuffle: boolean
  // queueList: Track[] & QueryId
  listAllTracks: Track[]
  queueList: Track[]
  setQueue: (queueList: Track[]) => void
  addToQueue: (track: Track) => void
  removeFromQueue: (id: string) => void
  nextTrack: () => void
  previousTrack: () => void
}

export const useQueue = create<IQueue>()(
  devtools((set) => ({
    shuffle: false,
    listAllTracks: [],
    queueList: [],
    setQueue: (queueList: Track[]) => set({ queueList: [...queueList] }),
    addToQueue: (track: Track) => {
      set((state) => ({
        queueList: [...state.queueList, track],
        listAllTracks: [...state.listAllTracks, track]
      }))
    },
    removeFromQueue: (id: string) => {
      set((state) => ({
        queueList: [...state.queueList.filter((track) => track.id !== id)]
      }))
    },
    nextTrack: () => {
      set((state) => {
        const queueList = state.queueList
        if (queueList.length === 0) {
          return { queueList: [] }
        }
        const nextTrack = queueList.shift()
        if (!nextTrack) {
          return { queueList: [] }
        }
        const storePlayer = usePlayer.getState()
        storePlayer.audioSrc?.pause()
        storePlayer.setAudioSrc(new Audio(`/${nextTrack.audio}`))
        storePlayer.setCurrentSong(nextTrack)
        return { queueList }
      })
    },
    previousTrack: () => {
      set((state) => {
        const queueList = state.queueList

        return { queueList }
      })
    }
  }))
)
