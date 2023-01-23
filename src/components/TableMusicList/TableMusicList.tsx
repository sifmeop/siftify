import Duration from 'assets/icons/duration.svg'
import type { NextPage } from 'next'
import TableMusicItem from './TableMusicItem/TableMusicItem'
import { api } from '@/utils/api'
import clsx from 'clsx'
import styles from './TableMusicList.module.scss'

interface IProps {
  artistId: string
}

const TableMusicList: NextPage<IProps> = ({ artistId }) => {
  const { data: tracks } = api.artists.getArtistTracks.useQuery({ artistId })

  return (
    <div>
      <div>
        <div className={styles.head}>
          <div className={clsx(styles.headTitle, 'text-center')}>#</div>
          <div className={styles.headTitle}>TITLE</div>
          <div />
          <div className={styles.headTitle}>
            <Duration className='mx-auto' />
          </div>
        </div>
        <div>
          {tracks?.map((track, index) => (
            <TableMusicItem key={track.id} track={track} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TableMusicList
