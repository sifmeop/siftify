import Duration from 'assets/icons/duration.svg'
import type { NextPage } from 'next'
import TableMusicItem from '../../../TableMusicList/TableMusicItem/TableMusicItem'
import type { Track } from '@prisma/client'
import clsx from 'clsx'
import styles from './TrackItem.module.scss'

interface IProps {
  track: Track
}

const TrackItem: NextPage<IProps> = ({ track }) => {
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
      <div>
        <TableMusicItem track={track} index={0} />
      </div>
    </div>
  )
}

export default TrackItem
