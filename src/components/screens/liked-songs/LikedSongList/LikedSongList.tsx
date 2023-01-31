import { LikedSong, User } from '@prisma/client'

import Duration from 'assets/icons/duration.svg'
import LikedSongItem from '../LikedSongItem/LikedSongItem'
import type { NextPage } from 'next'
import clsx from 'clsx'
import styles from './LikedSongList.module.scss'

interface IProps {
  tracks: (LikedSong & { user: User })[] | undefined
}

const LikedSongList: NextPage<IProps> = ({ tracks }) => {
  return (
    <div>
      <div className={styles.head}>
        <div className={clsx(styles.headTitle, 'text-center')}>#</div>
        <div className={styles.headTitle}>НАЗВАНИЕ</div>
        <div />
        <div className={styles.headTitle}>
          <Duration className='mx-auto' />
        </div>
      </div>
      {tracks?.map((track, index) => (
        <LikedSongItem
          key={track.id}
          id={track.id}
          trackId={track.trackId}
          index={index}
        />
      ))}
    </div>
  )
}

export default LikedSongList
