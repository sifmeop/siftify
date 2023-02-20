import { Dropdown, message } from 'antd'

import { useIsCurrentTrack } from '@/hooks/useIsCurrentTrack'
import { usePlayer } from '@/stores/usePlayer'
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
  const queueList = usePlayer((state) => state.queueList)
  const addToQueue = usePlayer((state) => state.addToQueue)
  const removeFromQueue = usePlayer((state) => state.removeFromQueue)
  const isCurrentTrack = useIsCurrentTrack(track.title)

  const handleAddToQueue = () => {
    addToQueue(track)
    void message.success(`Добавлен в очередь трек: ${track.title}`)
  }

  const handleRemoveFromQueue = () => {
    removeFromQueue(track.id)
    void message.success(`Удален из очереди трек: ${track.title}`)
  }

  const items: MenuProps['items'] = [
    {
      label: <button onClick={handleAddToQueue}>Добавить в очередь</button>,
      key: '1'
    },
    {
      label: (
        <button onClick={handleRemoveFromQueue}>Удалить из очереди</button>
      ),
      key: '2',
      disabled: !queueList.includes(track)
    },
    { type: 'divider' },
    {
      label: <button>Добавить в избранное</button>,
      key: '3'
    },
    {
      label: <button>Убрать из избранных</button>,
      key: '4',
      disabled: true
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
        <Favorite track={track} className={styles.favorite} />
        <Duration track={track} />
      </div>
    </Dropdown>
  )
}

export default memo(TrackItem)
