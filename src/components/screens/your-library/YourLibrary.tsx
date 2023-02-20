import { api } from '@/utils/api'
import CoverPlaylist from 'assets/images/cover-playlist.jpg'
import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import styles from './YourLibrary.module.scss'

const YourLibrary: NextPage = () => {
  const { data: sessionData } = useSession()
  const userId = String(sessionData?.user?.id)

  const { data: playlists } = api.playlists.getAllPlaylists.useQuery(
    { userId },
    { enabled: !!sessionData }
  )

  useEffect(() => {
    console.log(playlists)
  }, [playlists])

  return (
    <>
      {playlists ? (
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
                <Link href={`/playlist/${playlist.id}`} className={styles.name}>
                  <h1>{playlist.name}</h1>
                </Link>
                <p className={styles.description}>{playlist.description}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1>Список плейлистов пуст</h1>
      )}
    </>
  )
}

export default YourLibrary
