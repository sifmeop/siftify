import LikedTracks from '@/components/screens/liked-tracks/LikedTracks'
import Meta from '@/utils/Meta'
import { type NextPage } from 'next'

const LikedTracksPage: NextPage = () => {
  return (
    <>
      <Meta title='Любимые треки' description='Список любимых треков' />
      <LikedTracks />
    </>
  )
}

export default LikedTracksPage
