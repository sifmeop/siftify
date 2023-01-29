import LikedSongs from '@/components/screens/liked-songs/LikedSongs'
import Meta from '@/utils/Meta'
import { type NextPage } from 'next'

const LikedSongsPage: NextPage = () => {
  return (
    <>
      <Meta title='Любимые треки' description='Список любимых треков' />
      <LikedSongs />
    </>
  )
}

export default LikedSongsPage
