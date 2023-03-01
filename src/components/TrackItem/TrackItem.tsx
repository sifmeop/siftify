import { useIsCurrentTrack } from '@/hooks/useIsCurrentTrack'
import { useQueue } from '@/hooks/useQueue'
import { usePlayer } from '@/stores/usePlayer'
import type { Track } from '@prisma/client'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
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

  const { isInQueue, addToQueue, removeFromQueue } = useQueue(track)

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
