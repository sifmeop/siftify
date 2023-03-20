import Home from '@/components/screens/home/Home'
import Meta from '@/utils/Meta'
import type { Artist, Track } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { type NextPage } from 'next'

interface Props {
  artists: (Artist & { tracks: Track[] })[]
}

const HomePage: NextPage<Props> = ({ artists }) => {
  console.log(artists)
  return (
    <>
      <Meta
        title='Главная'
        description='Главная страница со всеми исполнителями и их треками'
      />
      <Home artists={artists} />
    </>
  )
}

export default HomePage

export const getStaticProps = async () => {
  const prisma = new PrismaClient()
  const artists = await prisma.artist.findMany({
    include: {
      tracks: true
    }
  })

  return {
    props: { artists }
  }
}
