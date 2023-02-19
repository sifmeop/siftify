import ArtistCard from '@/components/ArtistCard/ArtistCard'
import PagePanel from '@/components/PagePanel/PagePanel'
import TableHeader from '@/components/TableHeader/TableHeader'
import TrackItem from '@/components/TrackItem/TrackItem'
import { useDuration } from '@/hooks/useDuration'
import { useIsCurrentTrack } from '@/hooks/useIsCurrentTrack'
import type { Track as ITrack } from '@prisma/client'
import type { NextPage } from 'next'
import { memo } from 'react'
import styles from './Track.module.scss'

interface IProps {
  track: ITrack
}

const Track: NextPage<IProps> = ({ track }) => {
  const duration = useDuration(track, 'normal')
  const isCurrentTrack = useIsCurrentTrack(track.title)

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
      <PagePanel track={track} isCurrentPath={isCurrentTrack} />
      <TableHeader />
      <TrackItem track={track} index={0} />
    </div>
  )
}

export default memo(Track)
