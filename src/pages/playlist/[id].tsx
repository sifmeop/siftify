import Meta from '@/utils/Meta'
import { type NextPage } from 'next'
import { useRouter } from 'next/router'

const PlaylistPage: NextPage = () => {
  const { query } = useRouter()
  console.log(query.id)
  return (
    <>
      <Meta
        title={`Плейлист: ${String(query.id)}`}
        description={`Плейлист под названием: ${String(query.id)}}`}
      />
      <div>PlaylistPage</div>
    </>
  )
}

export default PlaylistPage
