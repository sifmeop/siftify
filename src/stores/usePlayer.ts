import type { Track } from '@prisma/client'
import { create } from 'zustand'

interface IPlayer {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  currentSong: Track | null
  setCurrentSong: (song: Track | null) => void
  audioSrc: HTMLAudioElement | null
  setAudioSrc: (src: HTMLAudioElement | null) => void
  volume: number
  setVolume: (volume: number) => void
}

export const usePlayer = create<IPlayer>((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  currentSong: null,
  setCurrentSong: (song: Track | null) => set({ currentSong: song }),
  audioSrc: null,
  setAudioSrc: (src: HTMLAudioElement | null) => set({ audioSrc: src }),
  volume: 50,
  setVolume: (volume: number) => set({ volume })
}))
