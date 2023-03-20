import YourLibrary from '@/components/screens/your-library/YourLibrary'
import Meta from '@/utils/Meta'
import type { Playlist } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import type { GetServerSideProps } from 'next'
import { type NextPage } from 'next'
import { getSession } from 'next-auth/react'

interface Props {
  playlists: Playlist[]
}

const YourLibraryPage: NextPage<Props> = ({ playlists }) => {
  return (
    <>
      <Meta title='Моя медиатека' description='Медиатека с моими плейлистами' />
      <YourLibrary playlists={playlists} />
    </>
  )
}

export default YourLibraryPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  const userId = session?.user?.id

  if (!userId) {
    return { props: {} }
  }

  const prisma = new PrismaClient()

  const playlists = await prisma.playlist.findMany({
    where: { userId }
  })

  return {
    props: { playlists }
  }
}
