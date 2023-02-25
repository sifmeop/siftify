import { message, Modal } from 'antd'
import { useCallback, useState } from 'react'

import { api } from '@/utils/api'
import type { CreatePlaylist } from '@prisma/client'
import clsx from 'clsx'
import type { NextPage } from 'next'
import styles from './EditPlaylist.module.scss'

interface IProps {
  playlist: CreatePlaylist
  open: boolean
  setOpen: (value: boolean) => void
}

interface IState {
  name: string
  description: string | null
}

const EditPlaylist: NextPage<IProps> = ({ playlist, open, setOpen }) => {
  const [input, setInput] = useState<IState>({
    name: playlist.name,
    description: playlist.description || ''
  })

  const { refetch } = api.playlists.updatePlaylist.useQuery(
    { id: playlist.id, name: input.name, description: input.description },
    { enabled: false }
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
    } else {
      void message.error('Ошибка изменения плейлиста')
    }
    setOpen(false)
  }, [refetch, setOpen])

  return (
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
          onChange={(e) => setInput({ ...input, description: e.target.value })}
        />
        <button
          onClick={() => void handleEditPlaylist()}
          className={styles.create}>
          Создать
        </button>
      </div>
    </Modal>
  )
}

export default EditPlaylist
