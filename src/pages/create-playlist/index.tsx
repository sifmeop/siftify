import CreatePlaylist from '@/components/screens/create-playlist/CreatePlaylist'
import Meta from '@/utils/Meta'
import { type NextPage } from 'next'

const CreatePlaylistPage: NextPage = () => {
  return (
    <>
      <Meta title='Create Playlist' description='' />
      <CreatePlaylist />
    </>
  )
}

export default CreatePlaylistPage
