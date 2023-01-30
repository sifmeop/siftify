import CoverPlaylist from 'assets/images/cover-playlist.jpg'
import Image from 'next/image'
import type { NextPage } from 'next'
import clsx from 'clsx'
import styles from './CreatePlaylist.module.scss'
import { useState } from 'react'

interface ICreate {
  name: string
  description: string
}

const CreatePlaylist: NextPage = () => {
  const [create, setCreate] = useState<ICreate>({ name: '', description: '' })

  return (
    <div className={styles.createPlaylist}>
      <h1 className={styles.title}>Создать плейлист</h1>
      <div className='mb-5 flex gap-4'>
        <Image
          className='rounded-lg'
          width={200}
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
      <button className={styles.create}>Создать</button>
    </div>
  )
}

export default CreatePlaylist
