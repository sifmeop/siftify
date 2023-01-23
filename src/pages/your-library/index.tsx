import YourLibrary from '@/components/screens/your-library/YourLibrary'
import Meta from '@/utils/Meta'
import { type NextPage } from 'next'

const YourLibraryPage: NextPage = () => {
  return (
    <>
      <Meta title='Your Library' description='' />
      <YourLibrary />
    </>
  )
}

export default YourLibraryPage
