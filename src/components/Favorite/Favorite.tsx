import { useFavorites } from '@/stores/useFavorites'
import { api } from '@/utils/api'
import type { Track } from '@prisma/client'
import InFavorites from 'assets/icons/in-favorites.svg'
import NotInFavorites from 'assets/icons/not-in-favorites.svg'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { memo } from 'react'

interface IProps {
  track: Track
  className?: string
}

const Favorite: NextPage<IProps> = ({ track, className }) => {
  const { data: sessionData } = useSession()
  const userId = String(sessionData?.user?.id)
  const favorites = useFavorites((state) => state.favorites)
  const addFavorite = useFavorites((state) => state.addFavorite)
  const removeFavorite = useFavorites((state) => state.removeFavorite)

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
    const res = await refetchAddToFavorites()
    addFavorite({
      id: String(res.data?.id),
      trackId: track.id,
      userId
    })
    console.log(`Добавлен трек ${track?.title}`)
  }

  const deleteFromFavorites = async () => {
    const res = await refetchDeleteFromFavorites()
    removeFavorite({ id: String(res.data?.id), userId, trackId: track?.id })
    console.log(`Удален трек ${track?.title}`)
  }

  return (
    <>
      {favorites &&
      favorites.some((favorite) => favorite.trackId === track?.id) ? (
        <InFavorites
          onClick={deleteFromFavorites}
          className={clsx(className, 'cursor-pointer')}
        />
      ) : (
        <NotInFavorites
          onClick={addToFavorites}
          className={clsx(className, 'cursor-pointer')}
        />
      )}
    </>
  )
}

export default memo(Favorite)
