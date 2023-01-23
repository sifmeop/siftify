import LikedSongs from '@/components/screens/liked-songs/LikedSongs'
import Meta from '@/utils/Meta'
import { type NextPage } from 'next'

const LikedSongsPage: NextPage = () => {
  return (
    <>
      <Meta title='Liked Songs' description='' />
      <LikedSongs />
    </>
  )
}

export default LikedSongsPage
