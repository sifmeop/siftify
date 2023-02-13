import { usePlayer } from '@/stores/usePlayer'
import type { Track } from '@prisma/client'
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
  const currentSong = usePlayer((state) => state.currentSong)
  const isPlaying = usePlayer((state) => state.isPlaying)
  const isCurrentPath = currentSong?.title === track.title

  return (
    <div className={clsx(styles.track, { ['bg-white']: isCurrentPath })}>
      <div>
        <div className={clsx(styles.trackIndex, 'text-center')}>
          <span style={{ display: isCurrentPath ? 'none' : 'block' }}>
            {index + 1}
          </span>
        </div>
        <PlayTrack
          size='small'
          isCurrentPath={isCurrentPath}
          className={styles.controlPanel}
          track={track}
        />
        <Equalizer
          isCurrentPath={isCurrentPath}
          className={styles.equalizer}
          isPlaying={isPlaying}
        />
      </div>
      <div>
        <h1 className='inline-block hover:underline'>
          <Link href={`/track/${track.id}`}>{track.title}</Link>
        </h1>
        <h2 className={styles.featuring}>{track.featuring.join(', ')}</h2>
      </div>
      <Favorite track={track} className={styles.favorite} />
      <Duration track={track} />
    </div>
  )
}

export default memo(TrackItem)
