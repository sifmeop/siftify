import type { LikedTrack } from '@prisma/client'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IFavorites {
  favorites: LikedTrack[]
  setFavorites: (favorites: LikedTrack[]) => void
  addFavorite: (favorite: LikedTrack) => void
  removeFavorite: (favorite: LikedTrack) => void
}

export const useFavorites = create<IFavorites>()(
  devtools((set) => ({
    favorites: [],
    setFavorites: (favorites) => set({ favorites }),
    addFavorite: (favorite) =>
      set((state) => ({ favorites: [...state.favorites, favorite] })),
    removeFavorite: (favorite) =>
      set((state) => ({
        favorites: state.favorites.filter((fav) => fav.id !== favorite.id)
      }))
  }))
)
