import type { Track } from '@prisma/client'
import { create } from 'zustand'

interface IPlayer {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  currentSong: Track | null
  setCurrentSong: (song: Track) => void
  audioSrc: HTMLAudioElement | null
  setAudioSrc: (src: HTMLAudioElement) => void
  volume: number
  setVolume: (volume: number) => void
}

export const usePlayer = create<IPlayer>((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  currentSong: null,
  setCurrentSong: (song: Track) => set({ currentSong: song }),
  audioSrc: null,
  setAudioSrc: (src: HTMLAudioElement) => set({ audioSrc: src }),
  volume: 50,
  setVolume: (volume: number) => set({ volume })
}))
