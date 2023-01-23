import Meta from '@/utils/Meta'
import { type NextPage } from 'next'
import { useRouter } from 'next/router'

const PlaylistPage: NextPage = () => {
  const { query } = useRouter()
  console.log(query.id)
  return (
    <>
      <Meta
        title={`Playlist: ${String(query.id)}`}
        description={`Playlist called ${String(query.id)}}`}
      />
      <div>PlaylistPage</div>
    </>
  )
}

export default PlaylistPage
