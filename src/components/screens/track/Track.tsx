import ArtistCard from '@/components/ArtistCard/ArtistCard'
import type { Track as ITrack } from '@prisma/client'
import type { NextPage } from 'next'
import TrackItem from '@/components/screens/track/TrackItem/TrackItem'
import styles from './Track.module.scss'
import { useDuration } from '@/hooks/useDuration'

interface IProps {
  track: ITrack
}

const Track: NextPage<IProps> = ({ track }) => {
  const duration = useDuration(track, 'normal')

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
      <div></div>
      <TrackItem track={track} />
    </div>
  )
}

export default Track
