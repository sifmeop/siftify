import { memo, useState } from 'react'

import TableHeader from '@/components/TableHeader/TableHeader'
import TrackItem from '@/components/TrackItem/TrackItem'
import { usePlayer } from '@/stores/usePlayer'
import { checkTracksLength } from '@/utils/checkTracksLength'
import { Modal } from 'antd'
import type { NextPage } from 'next'
import { BsMusicNoteList } from 'react-icons/bs'
import styles from './QueueList.module.scss'

const QueueList: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false)

  const queueList = usePlayer((state) => state.queueList)
  const shuffle = usePlayer((state) => state.shuffle)
  const shuffleList = usePlayer((state) => state.shuffleList)
  const clearQueue = usePlayer((state) => state.clearQueue)

  return (
    <>
      <BsMusicNoteList
        size='1.875rem'
        color='#8a8f96'
        className='player-button'
        onClick={() => setOpen(true)}
      />
      <Modal
        title={
          queueList.length &&
          `В очереди ${queueList?.length} ${checkTracksLength(
            queueList?.length
          )}`
        }
        width={800}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}>
        {shuffle ? (
          <>
            {shuffleList.length > 0 ? (
              <>
                <button className={styles.clearQueue} onClick={clearQueue}>
                  Очистить очередь
                </button>
                <TableHeader />
                {shuffleList.map((track, index) => (
                  <TrackItem key={track.id} track={track} index={index} />
                ))}
              </>
            ) : (
              <h1 className='text-center text-2xl font-medium text-primary'>
                Очередь пуста
              </h1>
            )}
          </>
        ) : (
          <>
            {queueList.length > 0 ? (
              <>
                <button className={styles.clearQueue} onClick={clearQueue}>
                  Очистить очередь
                </button>
                <TableHeader />
                {queueList.map((track, index) => (
                  <TrackItem key={track.id} track={track} index={index} />
                ))}
              </>
            ) : (
              <h1 className='text-center text-2xl font-medium text-primary'>
                Очередь пуста
              </h1>
            )}
          </>
        )}
      </Modal>
    </>
  )
}

export default memo(QueueList)
