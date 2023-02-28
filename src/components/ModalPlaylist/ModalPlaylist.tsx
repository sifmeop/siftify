import { usePlaylistStore } from '@/stores/usePlaylistStore'
import { api } from '@/utils/api'
import { Modal } from 'antd'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import ModalPlaylistTrack from './ModalPlaylistTrack/ModalPlaylistTrack'

interface IProps {
  trackId: string | undefined
  title: string | undefined
}

const ModalPlaylist: NextPage<IProps> = ({ trackId, title }) => {
  const isOpen = usePlaylistStore((state) => state.isOpen)
  const setOpen = usePlaylistStore((state) => state.setOpen)

  const { data: sessionData } = useSession()
  const userId = String(sessionData?.user?.id)

  const { data: playlists } = api.playlists.getPlaylists.useQuery(
    { userId },
    { enabled: !!sessionData }
  )

  return (
    <Modal
      title={
        <>
          Добавить трек в плейлист: <u>{title || ''}</u>
        </>
      }
      width={800}
      open={isOpen}
      onCancel={setOpen}
      destroyOnClose={true}
      footer={null}>
      {playlists && playlists.length > 0 ? (
        playlists.map((playlist, index) => (
          <ModalPlaylistTrack
            key={playlist.id}
            trackId={trackId}
            playlist={playlist}
            index={index}
          />
        ))
      ) : (
        <h1>Список плейлистов пуст</h1>
      )}
    </Modal>
  )
}

export default ModalPlaylist
