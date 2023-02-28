import { useFavoritesHook } from '@/hooks/useFavoritesHook'
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
}

const Favorite: NextPage<IProps> = ({ track }) => {
  const { isFav, addToFavorites, deleteFromFavorites } = useFavoritesHook(track)

  return (
    <>
      {isFav ? (
        <Tooltip title='Удалить с избранного'>
          <InFavorites
            onClick={deleteFromFavorites}
            className={clsx(styles.icon, 'player-button')}
          />
        </Tooltip>
      ) : (
        <Tooltip title='Добавить в избранное'>
          <NotInFavorites
            onClick={addToFavorites}
            className={clsx(styles.icon, 'player-button')}
          />
        </Tooltip>
      )}
    </>
  )
}

export default memo(Favorite)
