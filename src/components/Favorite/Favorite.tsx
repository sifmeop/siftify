import { message, Tooltip } from 'antd'

import { useFavorites } from '@/stores/useFavorites'
import { usePlayer } from '@/stores/usePlayer'
import { api } from '@/utils/api'
import type { Track } from '@prisma/client'
import InFavorites from 'assets/icons/in-favorites.svg'
import NotInFavorites from 'assets/icons/not-in-favorites.svg'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { memo } from 'react'
import styles from './Favorite.module.scss'

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

  const currentSong = usePlayer((state) => state.currentSong)
  const isCurrentPath = currentSong?.title === track.title

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

  return (
    <>
      {favorites?.some((favorite) => favorite.trackId === track?.id) ? (
        <Tooltip title='Удалить с избранного'>
          <InFavorites
            onClick={deleteFromFavorites}
            className={clsx(className, 'player-button', {
              [styles.visibleIcon as string]: isCurrentPath
            })}
          />
        </Tooltip>
      ) : (
        <Tooltip title='Добавить в избранное'>
          <NotInFavorites
            onClick={addToFavorites}
            className={clsx(className, 'player-button', {
              [styles.visibleIcon as string]: isCurrentPath
            })}
          />
        </Tooltip>
      )}
    </>
  )
}

export default memo(Favorite)
