import type { Playlist, Track } from '@prisma/client'
import { MdAdd, MdClose } from 'react-icons/md'

import { usePlaylist } from '@/hooks/usePlaylist'
import { Tooltip } from 'antd'
import clsx from 'clsx'
import type { NextPage } from 'next'
import styles from './ModalPlaylistTrack.module.scss'

interface IProps {
  trackId: string | undefined
  playlist: Playlist & { tracks: Track[] }
  index: number
}

const ModalPlaylistTrack: NextPage<IProps> = ({ trackId, playlist, index }) => {
  const { isTrackInPlaylist, handleAddToPlaylist, handleDeleteFromPlaylist } =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    usePlaylist(trackId!, playlist)

  return (
    <div
      className={clsx(styles.playlist, {
        [styles.playlistDisable as string]: isTrackInPlaylist
      })}>
      <div className={styles.name}>
        <h1>
          {index + 1}. {playlist.name}
        </h1>
        {isTrackInPlaylist ? (
          <Tooltip title='Удалить из плейлиста'>
            <MdClose
              size='2rem'
              className={styles.icon}
              onClick={() => void handleDeleteFromPlaylist()}
            />
          </Tooltip>
        ) : (
          <Tooltip title='Добавить в плейлист'>
            <MdAdd
              size='2rem'
              className={styles.icon}
              onClick={() => void handleAddToPlaylist()}
            />
          </Tooltip>
        )}
      </div>
    </div>
  )
}

export default ModalPlaylistTrack
