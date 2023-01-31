import ArtistCard from '@/components/ArtistCard/ArtistCard'
import type { Track as ITrack } from '@prisma/client'
import type { NextPage } from 'next'
import PagePanel from '@/components/PagePanel/PagePanel'
import TrackItem from '@/components/screens/track/TrackItem/TrackItem'
import { memo } from 'react'
import styles from './Track.module.scss'
import { useDuration } from '@/hooks/useDuration'
import { usePlayer } from '@/stores/usePlayer'

interface IProps {
  track: ITrack
}

const Track: NextPage<IProps> = ({ track }) => {
  const duration = useDuration(track, 'normal')
  const currentSong = usePlayer((state) => state.currentSong)
  const isCurrentPath = currentSong?.title === track.title

  return (
    <div>
      <ArtistCard
        size={300}
        image={track.image}
        name={track.title}
        type='СИНГЛ'
        title={track.title}
        info={
          <>
            {track.featuring.join(' ৹ ')},{' '}
            <span className={styles.duration}>{duration}</span>
          </>
        }
      />
      <PagePanel track={track} isCurrentPath={isCurrentPath} />
      {/* <div className={styles.panel}>
        <PlayTrack isCurrentPath={isCurrentPath} track={track} size='big' />
        <Favorite />
      </div> */}
      <TrackItem track={track} />
    </div>
  )
}

export default memo(Track)
