import { api } from '@/utils/api'
import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Separator from '../Separator/Separator'
import PlaylistItem from './PlaylistItem/PlaylistItem'

const PlaylistList: NextPage = () => {
  const { data: sessionData } = useSession()
  const userId = String(sessionData?.user?.id)

  const { data: playlists } = api.playlists.getPlaylists.useQuery(
    { userId },
    { enabled: !!sessionData }
  )

  return (
    <>
      {sessionData && playlists && playlists.length > 0 && (
        <>
          <Separator title='Плейлисты' />
          <ul>
            {playlists.map((playlist) => (
              <PlaylistItem key={playlist.name} item={playlist} />
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default PlaylistList
