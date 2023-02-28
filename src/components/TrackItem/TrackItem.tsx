import { Dropdown } from 'antd'

import { useFavoritesHook } from '@/hooks/useFavoritesHook'
import { useIsCurrentTrack } from '@/hooks/useIsCurrentTrack'
import { useQueue } from '@/hooks/useQueue'
import { usePlayer } from '@/stores/usePlayer'
import { usePlaylistStore } from '@/stores/usePlaylistStore'
import type { Track } from '@prisma/client'
import type { MenuProps } from 'antd'
import clsx from 'clsx'
import type { NextPage } from 'next'
import Link from 'next/link'
import { memo } from 'react'
import Favorite from '../Favorite/Favorite'
import PlayTrack from '../PlayTrack/PlayTrack'
import Duration from './Duration/Duration'
import Equalizer from './Equalizer/Equalizer'
import styles from './TrackItem.module.scss'

interface IProps {
  track: Track
  index: number
}

const TrackItem: NextPage<IProps> = ({ track, index }) => {
  const currentTrack = usePlayer((state) => state.currentTrack)
  const isPlaying = usePlayer((state) => state.isPlaying)
  const isCurrentTrack = useIsCurrentTrack(track.title)

  const { isFav, addToFavorites, deleteFromFavorites } = useFavoritesHook(track)
  const { isInQueue, addToQueue, removeFromQueue } = useQueue(track)
  const setOpen = usePlaylistStore((state) => state.setOpen)

  const items: MenuProps['items'] = [
    {
      label: <button onClick={addToQueue}>Добавить в очередь</button>,
      key: '1',
      disabled: isInQueue
    },
    {
      label: <button onClick={removeFromQueue}>Удалить из очереди</button>,
      key: '2',
      disabled: !isInQueue
    },
    { type: 'divider' },
    {
      label: (
        <button onClick={() => void addToFavorites()}>
          Добавить в любимые
        </button>
      ),
      key: '3',
      disabled: isFav
    },
    {
      label: (
        <button onClick={() => void deleteFromFavorites()}>
          Убрать из избранных
        </button>
      ),
      key: '4',
      disabled: !isFav
    },
    { type: 'divider' },
    {
      label: <button onClick={setOpen}>Добавить в плейлист</button>,
      key: '5'
    },
    {
      label: <button>Удалить из плейлиста</button>,
      key: '6'
    }
  ]

  return (
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      <div
        className={clsx(styles.track, {
          [styles.currentTrack as string]: currentTrack?.id === track.id
        })}>
        <div>
          <div className={styles.trackIndex}>
            <span style={{ display: isCurrentTrack ? 'none' : 'block' }}>
              {index + 1}
            </span>
          </div>
          <PlayTrack
            size='small'
            isCurrentPath={isCurrentTrack}
            className={styles.controlPanel}
            track={track}
          />
          <Equalizer
            isCurrentPath={isCurrentTrack}
            className={styles.equalizer}
            isPlaying={isPlaying}
          />
        </div>
        <div>
          <h1 className={styles.title}>
            <Link href={`/track/${track.id}`}>{track.title}</Link>
          </h1>
          <p className={styles.featuring}>{track.featuring.join(', ')}</p>
        </div>
        <Favorite track={track} />
        <Duration track={track} />
      </div>
    </Dropdown>
  )
}

export default memo(TrackItem)
