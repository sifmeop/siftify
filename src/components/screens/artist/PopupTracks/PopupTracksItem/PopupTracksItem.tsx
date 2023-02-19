import Favorite from '@/components/Favorite/Favorite'
import PlayTrack from '@/components/PlayTrack/PlayTrack'
import QueueTrackItem from '@/components/TrackItem/QueueTrackItem'
import { useIsCurrentTrack } from '@/hooks/useIsCurrentTrack'
import type { Track } from '@prisma/client'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './PopupTracksItem.module.scss'

interface IProps {
  track: Track
  index: number
}

const PopupTracksItem: NextPage<IProps> = ({ track, index }) => {
  const isCurrentTrack = useIsCurrentTrack(track.title)

  return (
    <div className={styles.track}>
      <div className='flex items-center gap-3'>
        <Image
          className={styles.image}
          width={150}
          height={150}
          src={`/${track.image}`}
          alt={track.title}
          priority
        />
        <div className='flex flex-col items-start gap-3'>
          <h1 className={styles.title}>
            <Link href={`/track/${track.id}`}>{track.title}</Link>
          </h1>
          <div className='flex items-center gap-3'>
            <PlayTrack
              size='small'
              track={track}
              isCurrentPath={isCurrentTrack}
            />
            <Favorite track={track} />
          </div>
        </div>
      </div>
      <QueueTrackItem track={track} index={index} />
    </div>
  )
}

export default PopupTracksItem
