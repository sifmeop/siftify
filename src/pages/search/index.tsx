import Search from '@/components/screens/search/Search'
import Meta from '@/utils/Meta'
import { type NextPage } from 'next'

const SearchPage: NextPage = () => {
  return (
    <>
      <Meta title='Поиск' description='Поиск по песням и артистам' />
      <Search />
    </>
  )
}

export default SearchPage
