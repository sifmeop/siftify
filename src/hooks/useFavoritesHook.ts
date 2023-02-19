import { useFavorites } from '@/stores/useFavorites'
import { api } from '@/utils/api'
import type { Track } from '@prisma/client'
import { message } from 'antd'
import { useSession } from 'next-auth/react'

export const useFavoritesHook = (track: Track) => {
  const { data: sessionData } = useSession()
  const userId = String(sessionData?.user?.id)
  const favorites = useFavorites((state) => state.favorites)
  const addFavorite = useFavorites((state) => state.addFavorite)
  const removeFavorite = useFavorites((state) => state.removeFavorite)

  const isFav = favorites?.some((favorite) => favorite.trackId === track?.id)

  const { refetch: refetchAddToFavorites } =
    api.favorites.addToFavorites.useQuery(
      { trackId: track?.id, userId },
      { enabled: false }
    )

  const { refetch: refetchDeleteFromFavorites } =
    api.favorites.removeFromFavorites.useQuery(
      {
        id: String(
          favorites?.find((favorite) => favorite.trackId === track?.id)?.id
        )
      },
      { enabled: false }
    )

  const addToFavorites = async () => {
    if (!sessionData) {
      await message.error(
        'Для добавления трека в избранное необходимо авторизоваться'
      )
      return
    }
    const res = await refetchAddToFavorites()
    addFavorite({
      id: String(res.data?.id),
      trackId: track.id,
      userId
    })
    await message.success(`Добавлен трек ${track?.title}`)
  }

  const deleteFromFavorites = async () => {
    if (!sessionData) {
      await message.error(
        'Для удаления трека из избранного необходимо авторизоваться'
      )
      return
    }
    const res = await refetchDeleteFromFavorites()
    removeFavorite({ id: String(res.data?.id), userId, trackId: track?.id })
    await message.success(`Удален трек ${track?.title}`)
  }

  return { isFav, addToFavorites, deleteFromFavorites }
}
