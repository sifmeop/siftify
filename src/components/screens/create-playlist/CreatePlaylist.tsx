import { api } from '@/utils/api'
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

  const createPlaylist = async () => {
    const createdPlaylist = await refetch()
    console.log(createdPlaylist.data)
  }

  return (
    <div className={styles.createPlaylist}>
      <h1 className={styles.title}>Создать плейлист</h1>
      <div className='mb-5 flex gap-4'>
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
      <button onClick={createPlaylist} className={styles.create}>
        Создать
      </button>
    </div>
  )
}

export default CreatePlaylist
