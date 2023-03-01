import { message, Modal } from 'antd'
import { memo, useCallback, useState } from 'react'

import { api } from '@/utils/api'
import type { Playlist } from '@prisma/client'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { FaEdit } from 'react-icons/fa'
import styles from './EditPlaylist.module.scss'

interface IProps {
  playlist: Playlist
}

interface IState {
  name: string
  description: string
}

const EditPlaylist: NextPage<IProps> = ({ playlist }) => {
  const [open, setOpen] = useState<boolean>(false)
  const { data: sessionData } = useSession()

  const [input, setInput] = useState<IState>({
    name: playlist.name,
    description: playlist.description || ''
  })

  const { refetch } = api.playlists.updatePlaylist.useQuery(
    {
      playlistId: playlist.id,
      name: input.name,
      description: input.description
    },
    { enabled: false }
  )

  const { refetch: refetchPlaylists } = api.playlists.getPlaylists.useQuery(
    { userId: String(sessionData?.user?.id) },
    { enabled: !!sessionData }
  )

  const handleOnCancel = useCallback(() => {
    setInput({
      name: playlist.name,
      description: playlist.description || ''
    })
    setOpen(false)
  }, [playlist, setOpen])

  const handleEditPlaylist = useCallback(async () => {
    const editedPlaylist = await refetch()
    if (editedPlaylist) {
      void message.success('Плейлист изменен')
      await refetchPlaylists()
    } else {
      void message.error('Ошибка изменения плейлиста')
    }
    setOpen(false)
  }, [refetch, refetchPlaylists])

  return (
    <>
      <FaEdit
        size='2rem'
        className='cursor-pointer transition-colors hover:text-primary-blue'
        onClick={() => setOpen(true)}
      />
      <Modal
        title={`Редактировать плейлист: ${playlist.name}`}
        width={800}
        open={open}
        onCancel={handleOnCancel}
        footer={null}>
        <div className='flex w-full flex-col gap-4'>
          <input
            type='text'
            className={styles.input}
            placeholder='Название...'
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
          <textarea
            className={clsx(styles.input, 'h-full resize-none')}
            placeholder='Описание...'
            value={input.description || ''}
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
          />
          <button
            onClick={() => void handleEditPlaylist()}
            className={styles.create}>
            Изменить
          </button>
        </div>
      </Modal>
    </>
  )
}

export default memo(EditPlaylist)
