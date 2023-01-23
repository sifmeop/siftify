import Home from '@/components/screens/home/Home'
import Meta from '@/utils/Meta'
import { type NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <>
      <Meta title='Home' description='' />
      <Home />
    </>
  )
}

export default HomePage
