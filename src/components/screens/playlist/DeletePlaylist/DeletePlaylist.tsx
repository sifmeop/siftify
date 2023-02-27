import { api } from '@/utils/api'
import type { Playlist } from '@prisma/client'
import { message } from 'antd'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { memo } from 'react'
import { AiFillDelete } from 'react-icons/ai'

interface IProps {
  playlist: Playlist
}

const DeletePlaylist: NextPage<IProps> = ({ playlist }) => {
  const { data: sessionData } = useSession()
  const userId = String(sessionData?.user?.id)
  const router = useRouter()

  const { refetch: refetchDeletePlaylist } =
    api.playlists.deletePlaylist.useQuery(
      { playlistId: playlist.id },
      { enabled: false }
    )

  const { refetch: refetchPlaylists } = api.playlists.getPlaylists.useQuery(
    { userId },
    { enabled: false }
  )

  const deletePlaylist = async () => {
    const deletedPlaylist = await refetchDeletePlaylist()
    if (deletedPlaylist) {
      void message.success('Плейлист удален')
      await refetchPlaylists()
      await router.push('/your-library')
    } else {
      void message.error('Ошибка удаления плейлиста')
    }
  }

  return (
    <AiFillDelete
      size='2rem'
      className='cursor-pointer transition-colors hover:text-primary-blue'
      onClick={() => void deletePlaylist()}
    />
  )
}

export default memo(DeletePlaylist)
