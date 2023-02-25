import type { Track } from '@prisma/client'
import arrayShuffle from 'array-shuffle'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IPlayer {
  playTrack: (track: Track) => void
  isPlaying: boolean
  togglePlay: (value: boolean) => void
  audio: HTMLAudioElement | null
  currentTrack: Track | null
  volume: number
  setVolume: (volume: number) => void
  queueList: Track[]
  shuffleList: Track[]
  shuffle: boolean
  setShuffle: () => void
  addToQueue: (track: Track) => void
  removeFromQueue: (id: string) => void
  nextTrack: () => void
  previousTrack: () => void
  clearQueue: () => void
}

export const usePlayer = create<IPlayer>()(
  devtools((set, get) => ({
    playTrack: (track: Track) => {
      const { audio, currentTrack } = get()
      const isCurrentPath = currentTrack?.title === track.title
      audio?.pause()
      if (!isCurrentPath) {
        set({
          isPlaying: false,
          audio: new Audio(`/${track.audio}`),
          currentTrack: track
        })
      }
      set({ isPlaying: true })
    },
    isPlaying: false,
    togglePlay: (value: boolean) => set({ isPlaying: value }),
    audio: null,
    currentTrack: null,
    volume: 50,
    setVolume: (volume: number) => set({ volume }),
    queueList: [],
    shuffleList: [],
    shuffle: false,
    setShuffle: () =>
      set(() => {
        const { shuffle, queueList } = get()
        if (queueList.length === 0) return { shuffle: shuffle }
        if (!shuffle) {
          const { queueList } = get()
          const shuffled = arrayShuffle(queueList)
          set({ shuffleList: shuffled })
        }
        return { shuffle: !shuffle }
      }),
    addToQueue: (track: Track) => {
      const queryId: string = Date.now().toString()
      const newTrack: Track = {
        id: track.id,
        title: track.title,
        artistId: track.artistId,
        featuring: track.featuring,
        image: track.image,
        audio: track.audio,
        queryId,
        createPlaylistId: null
      }
      set((state) => ({
        queueList: [...state.queueList, newTrack],
        shuffleList: [...state.shuffleList, newTrack]
      }))
    },
    removeFromQueue: (id: string) => {
      set((state) => ({
        queueList: state.queueList.filter((track) => track.queryId !== id),
        shuffleList: state.queueList.filter((track) => track.queryId !== id)
      }))
    },
    nextTrack: () => {
      const { queueList, currentTrack, audio, shuffle, shuffleList } = get()
      if (queueList.length === 0 || shuffleList.length === 0) return
      audio?.pause()
      if (shuffle) {
        const currentIndex = shuffleList.findIndex(
          (track) => track.id === currentTrack?.id
        )
        const nextIndex =
          currentIndex + 1 < shuffleList.length ? currentIndex + 1 : 0
        const nextTrack = shuffleList[nextIndex]
        set({
          currentTrack: nextTrack,
          isPlaying: true,
          audio: new Audio(nextTrack?.audio)
        })
      } else {
        const currentIndex = queueList.findIndex(
          (track) => track.id === currentTrack?.id
        )
        const nextIndex =
          currentIndex + 1 < queueList.length ? currentIndex + 1 : 0
        const nextTrack = queueList[nextIndex]
        set({
          currentTrack: nextTrack,
          isPlaying: true,
          audio: new Audio(nextTrack?.audio)
        })
      }
    },
    previousTrack: () => {
      const { queueList, currentTrack, audio, shuffle, shuffleList } = get()
      if (queueList.length === 0 || shuffleList.length === 0) return
      audio?.pause()
      if (shuffle) {
        const currentIndex = shuffleList.findIndex(
          (track) => track.id === currentTrack?.id
        )
        const previousIndex =
          currentIndex - 1 >= 0 ? currentIndex - 1 : shuffleList.length - 1
        const previousTrack = shuffleList[previousIndex]
        set({
          currentTrack: previousTrack,
          isPlaying: true,
          audio: new Audio(previousTrack?.audio)
        })
      } else {
        const currentIndex = queueList.findIndex(
          (track) => track.id === currentTrack?.id
        )
        const previousIndex =
          currentIndex - 1 >= 0 ? currentIndex - 1 : queueList.length - 1
        const previousTrack = queueList[previousIndex]
        set({
          currentTrack: previousTrack,
          isPlaying: true,
          audio: new Audio(previousTrack?.audio)
        })
      }
    },
    clearQueue: () => set({ queueList: [], shuffleList: [] })
  }))
)
