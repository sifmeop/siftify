import Duration from './Duration/Duration'
import Equalizer from './Equalizer/Equalizer'
import Favorite from '@/components/Favorite/Favorite'
import Link from 'next/link'
import type { NextPage } from 'next'
import PlayTrack from '@/components/PlayTrack/PlayTrack'
import type { Track } from '@prisma/client'
import clsx from 'clsx'
import { memo } from 'react'
import styles from './TableMusicItem.module.scss'
import { usePlayer } from '@/stores/usePlayer'

interface IProps {
  track: Track
  index: number
}

const TableMusicItem: NextPage<IProps> = ({ track, index }) => {
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
      <Favorite
        title={track.title}
        trackId={track.id}
        className={styles.favorite}
      />
      <Duration track={track} />
    </div>
  )
}

export default memo(TableMusicItem)
