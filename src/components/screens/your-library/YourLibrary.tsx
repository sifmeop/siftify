import { api } from '@/utils/api'
import CoverPlaylist from 'assets/images/cover-playlist.jpg'
import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect } from 'react'

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
    <div className='flex gap-3'>
      {playlists &&
        playlists.map((playlist) => (
          <div key={playlist.id}>
            <Image
              width={150}
              height={150}
              src={CoverPlaylist}
              alt={`Плейлист: ${playlist.name}`}
              placeholder='blur'
            />
            <h1>{playlist.name}</h1>
            <p>{playlist.description}</p>
          </div>
        ))}
    </div>
  )
}

export default YourLibrary
