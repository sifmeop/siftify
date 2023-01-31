import Duration from '@/components/TableMusicList/TableMusicItem/Duration/Duration'
import Equalizer from '@/components/TableMusicList/TableMusicItem/Equalizer/Equalizer'
import Favorite from '@/components/Favorite/Favorite'
import Link from 'next/link'
import type { NextPage } from 'next'
import PlayTrack from '@/components/PlayTrack/PlayTrack'
import { api } from '@/utils/api'
import clsx from 'clsx'
import styles from './LikedSongItem.module.scss'
import { usePlayer } from '@/stores/usePlayer'

interface IProps {
  id: string
  trackId: string
  index: number
}

const LikedSongItem: NextPage<IProps> = ({ id, trackId, index }) => {
  const { data: track } = api.tracks.getTrack.useQuery({ id: trackId })
  const currentSong = usePlayer((state) => state.currentSong)
  const isPlaying = usePlayer((state) => state.isPlaying)
  const isCurrentPath = currentSong?.title === track?.title
  return track ? (
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
        id={id}
        title={track.title}
        trackId={trackId}
        className={styles.favorite}
      />
      <Duration track={track} />
    </div>
  ) : null
}

export default LikedSongItem
