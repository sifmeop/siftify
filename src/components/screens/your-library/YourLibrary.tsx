import CoverPlaylist from 'assets/images/cover-playlist.jpg'
import Image from 'next/image'
import Link from 'next/link'
import type { NextPage } from 'next'
import type { Playlist } from '@prisma/client'
import styles from './YourLibrary.module.scss'
import { useSession } from 'next-auth/react'

interface Props {
  playlists: Playlist[]
}

const YourLibrary: NextPage<Props> = ({ playlists }) => {
  const { data: sessionData } = useSession()

  return (
    <>
      {sessionData?.user ? (
        <>
          {playlists && playlists.length > 0 ? (
            <>
              <h1 className={styles.title}>Список плейлистов</h1>
              <div className={styles.playlists}>
                {playlists.map((playlist) => (
                  <div key={playlist.id} className={styles.playlist}>
                    <Link href={`/playlist/${playlist.id}`}>
                      <Image
                        width={300}
                        height={300}
                        src={CoverPlaylist}
                        alt={`Плейлист: ${playlist.name}`}
                        placeholder='blur'
                        className={styles.image}
                      />
                    </Link>
                    <Link
                      href={`/playlist/${playlist.id}`}
                      className={styles.name}>
                      <h1>{playlist.name}</h1>
                    </Link>
                    <p className={styles.description}>{playlist.description}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h1 className='text-center text-2xl'>Список плейлистов пуст</h1>
          )}
        </>
      ) : (
        <h1 className='py-5 text-center'>Нужна войти в аккаунт</h1>
      )}
    </>
  )
}

export default YourLibrary
