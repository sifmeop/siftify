import { api } from '@/utils/api'
import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import PlaylistItem from './PlaylistItem/PlaylistItem'

const PlaylistList: NextPage = () => {
  const { data: sessionData } = useSession()
  const userId = String(sessionData?.user?.id)

  const { data: playlists } = api.playlists.getAllPlaylists.useQuery(
    { userId },
    { enabled: !!sessionData }
  )

  return (
    <ul>
      {playlists &&
        playlists.map((playlist) => (
          <PlaylistItem key={playlist.name} item={playlist} />
        ))}
    </ul>
  )
}

export default PlaylistList
