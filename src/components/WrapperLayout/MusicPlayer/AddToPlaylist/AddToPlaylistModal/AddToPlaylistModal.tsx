import { usePlayer } from '@/stores/usePlayer'
import { api } from '@/utils/api'
import { Modal } from 'antd'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { memo } from 'react'
import AddToPlaylistItemModal from './AddToPlaylistItemModal/AddToPlaylistItemModal'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const AddToPlaylistModal: NextPage<IProps> = ({ open, setOpen }) => {
  const currentTrack = usePlayer((state) => state.currentTrack)

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
          Добавить трек в плейлист: <u>{String(currentTrack?.title)}</u>
        </>
      }
      width={800}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}>
      {playlists && playlists.length > 0 ? (
        playlists.map((playlist, index) => (
          <AddToPlaylistItemModal
            key={playlist.id}
            playlist={playlist}
            index={index}
            setOpen={setOpen}
          />
        ))
      ) : (
        <h1>Список плейлистов пуст</h1>
      )}
    </Modal>
  )
}

export default memo(AddToPlaylistModal)
