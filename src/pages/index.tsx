import Home from '@/components/screens/home/Home'
import Meta from '@/utils/Meta'
import { type NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <>
      <Meta
        title='Главная'
        description='Главная страница со всеми исполнителями и их треками'
      />
      <Home />
    </>
  )
}

export default HomePage
