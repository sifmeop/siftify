import Search from '@/components/screens/search/Search'
import Meta from '@/utils/Meta'
import { type NextPage } from 'next'

const SearchPage: NextPage = () => {
  return (
    <>
      <Meta title='Search' description='' />
      <Search />
    </>
  )
}

export default SearchPage
