import CoverPlaylist from 'assets/images/cover-playlist.jpg'
import clsx from 'clsx'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import styles from './CreatePlaylist.module.scss'

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
      <button className={styles.create}>Создать</button>
    </div>
  )
}

export default CreatePlaylist
