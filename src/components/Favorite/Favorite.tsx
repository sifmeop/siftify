import { useFavoritesHook } from '@/hooks/useFavoritesHook'
import { useIsCurrentTrack } from '@/hooks/useIsCurrentTrack'
import type { Track } from '@prisma/client'
import { Tooltip } from 'antd'
import InFavorites from 'assets/icons/in-favorites.svg'
import NotInFavorites from 'assets/icons/not-in-favorites.svg'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { memo } from 'react'
import styles from './Favorite.module.scss'

interface IProps {
  track: Track
  className?: string
}

const Favorite: NextPage<IProps> = ({ track, className }) => {
  const { isFav, addToFavorites, deleteFromFavorites } = useFavoritesHook(track)
  const isCurrentTrack = useIsCurrentTrack(track.title)

  return (
    <>
      {isFav ? (
        <Tooltip title='Удалить с избранного'>
          <InFavorites
            onClick={deleteFromFavorites}
            className={clsx(className, 'player-button', {
              [styles.visibleIcon as string]: isCurrentTrack
            })}
          />
        </Tooltip>
      ) : (
        <Tooltip title='Добавить в избранное'>
          <NotInFavorites
            onClick={addToFavorites}
            className={clsx(className, 'player-button', {
              [styles.visibleIcon as string]: isCurrentTrack
            })}
          />
        </Tooltip>
      )}
    </>
  )
}

export default memo(Favorite)
