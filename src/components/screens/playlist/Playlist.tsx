import ArtistCard from '@/components/ArtistCard/ArtistCard'
import TableHeader from '@/components/TableHeader/TableHeader'
import { api } from '@/utils/api'
import type { CreatePlaylist } from '@prisma/client'
import { message } from 'antd'
import CoverPlaylist from 'assets/images/cover-playlist.jpg'
import type { NextPage } from 'next'
import { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import EditPlaylist from './EditPlaylist/EditPlaylist'
import styles from './Playlist.module.scss'

interface IProps {
  playlist: CreatePlaylist
}

const Playlist: NextPage<IProps> = ({ playlist }) => {
  const [open, setOpen] = useState<boolean>(false)

  const { refetch } = api.playlists.deletePlaylist.useQuery(
    { id: playlist.id },
    { enabled: false }
  )

  const deletePlaylist = async () => {
    const deletedPlaylist = await refetch()
    if (deletedPlaylist) {
      void message.success('Плейлист удален')
    } else {
      void message.error('Ошибка удаления плейлиста')
    }
  }

  return (
    <>
      <EditPlaylist playlist={playlist} open={open} setOpen={setOpen} />
      <ArtistCard
        image={CoverPlaylist}
        size={300}
        name={playlist.name}
        info={playlist.description}
        title={playlist.name}
        type='ПЛЕЙЛИСТ'
      />
      <div className='flex items-center gap-3 p-1'>
        <FaEdit
          size='2rem'
          className={styles.icon}
          onClick={() => setOpen(true)}
        />
        <AiFillDelete
          size='2rem'
          className={styles.icon}
          onClick={() => void deletePlaylist()}
        />
      </div>
      <TableHeader />
    </>
  )
}

export default Playlist
