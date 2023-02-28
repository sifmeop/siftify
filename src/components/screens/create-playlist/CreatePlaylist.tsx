import { api } from '@/utils/api'
import { message } from 'antd'
import CoverPlaylist from 'assets/images/cover-playlist.jpg'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import styles from './CreatePlaylist.module.scss'

interface ICreate {
  name: string
  description: string
}

const CreatePlaylist: NextPage = () => {
  const [create, setCreate] = useState<ICreate>({ name: '', description: '' })
  const { data: sessionData } = useSession()
  const userId = String(sessionData?.user?.id)

  const { refetch } = api.playlists.createPlaylist.useQuery(
    {
      userId,
      name: create.name,
      description: create.description
    },
    { enabled: false }
  )

  const { refetch: refetchPlaylists } = api.playlists.getPlaylists.useQuery(
    { userId },
    { enabled: false }
  )

  const createPlaylist = async (): Promise<void> => {
    const createdPlaylist = await refetch()
    if (createdPlaylist.data) {
      void message.success(
        `Плейлист: ${createdPlaylist.data.name}, успешно создан`
      )
      await refetchPlaylists()
    } else {
      void message.error('Не удалось создать плейлист')
    }
    setCreate({ name: '', description: '' })
  }

  return (
    <>
      {sessionData?.user ? (
        <div className={styles.createPlaylist}>
          <h1 className={styles.title}>Создать плейлист</h1>
          <div className={styles.form}>
            <Image
              width={200}
              className='rounded-lg'
              height={200}
              src={CoverPlaylist}
              alt='Обложка для плейлиста'
              placeholder='blur'
            />
            <div className='flex w-full flex-col gap-4'>
              <input
                type='text'
                className={styles.input}
                placeholder='Название...'
                value={create.name}
                onChange={(e) => setCreate({ ...create, name: e.target.value })}
              />
              <textarea
                className={clsx(styles.input, 'h-full resize-none')}
                placeholder='Описание...'
                value={create.description}
                onChange={(e) =>
                  setCreate({ ...create, description: e.target.value })
                }
              />
            </div>
          </div>
          <button
            onClick={() => void createPlaylist()}
            className={styles.create}
            disabled={!create.name.trim() || create.name.length < 3}>
            Создать
          </button>
        </div>
      ) : (
        <h1 className='py-5 text-center'>Нужна регистрация</h1>
      )}
    </>
  )
}

export default CreatePlaylist
