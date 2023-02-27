import type { Playlist, Track } from '@prisma/client'
import { message, Tooltip } from 'antd'
import { MdAdd, MdClose } from 'react-icons/md'

import { usePlayer } from '@/stores/usePlayer'
import { api } from '@/utils/api'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { memo } from 'react'
import styles from './AddToPlaylistItemModal.module.scss'

interface IProps {
  playlist: Playlist & { tracks: Track[] }
  index: number
  setOpen: (open: boolean) => void
}

const AddToPlaylistItemModal: NextPage<IProps> = ({
  playlist,
  index,
  setOpen
}) => {
  const { data: sessionData } = useSession()
  const userId = String(sessionData?.user?.id)
  const currentTrack = usePlayer((state) => state.currentTrack)
  const isTrackInPlaylist = playlist.tracks.some(
    (track) => track.id === currentTrack?.id
  )

  const { refetch: refetchAddTrackToPlaylist } =
    api.playlists.addTrackToPlaylist.useQuery(
      {
        playlistId: playlist.id,
        trackId: String(currentTrack?.id)
      },
      { enabled: !playlist }
    )

  const { refetch: refetchRemoveTrackFromPlaylist } =
    api.playlists.removeTrackFromPlaylist.useQuery(
      {
        playlistId: playlist.id,
        trackId: String(currentTrack?.id)
      },
      { enabled: !playlist }
    )

  const { refetch: playlistsPlaylists } = api.playlists.getPlaylists.useQuery(
    { userId },
    { enabled: !!sessionData }
  )

  const handleAddToPlaylist = async (): Promise<void> => {
    if (isTrackInPlaylist) {
      void message.error('Трек уже есть в плейлисте')
      return
    }
    await refetchAddTrackToPlaylist()
    void message.success('Трек добавлен в плейлист')
    await playlistsPlaylists()
  }

  const handleDeleteFromPlaylist = async (): Promise<void> => {
    const result = await refetchRemoveTrackFromPlaylist()
    if (result) {
      void message.success(`Трек удален из плейлиста: ${playlist.name}`)
      await playlistsPlaylists()
    } else {
      void message.error('Ошибка при удалении трека из плейлиста')
    }
  }

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

export default memo(AddToPlaylistItemModal)
