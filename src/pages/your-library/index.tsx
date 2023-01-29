import YourLibrary from '@/components/screens/your-library/YourLibrary'
import Meta from '@/utils/Meta'
import { type NextPage } from 'next'

const YourLibraryPage: NextPage = () => {
  return (
    <>
      <Meta title='Моя медиатека' description='Медиатека с моими плейлистами' />
      <YourLibrary />
    </>
  )
}

export default YourLibraryPage
