import CreatePlaylist from '@/components/screens/create-playlist/CreatePlaylist'
import Meta from '@/utils/Meta'
import { type NextPage } from 'next'

const CreatePlaylistPage: NextPage = () => {
  return (
    <>
      <Meta
        title='Создать плейлист'
        description='Страница для создания нового плейлиста'
      />
      <CreatePlaylist />
    </>
  )
}

export default CreatePlaylistPage
