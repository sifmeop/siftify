import type { GetStaticProps, NextPage } from 'next'

import Playlist from '@/components/screens/playlist/Playlist'
import Meta from '@/utils/Meta'
import type { CreatePlaylist } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { useRouter } from 'next/router'

interface IProps {
  playlist: CreatePlaylist
}

const PlaylistPage: NextPage<IProps> = ({ playlist }) => {
  const { query } = useRouter()
  console.log(query.id)

  return (
    <>
      <Meta
        title={`Плейлист: ${String(playlist.name)}`}
        description={`Плейлист под названием: ${String(playlist.name)}}`}
      />
      <Playlist playlist={playlist} />
    </>
  )
}

export default PlaylistPage

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string
  const prisma = new PrismaClient()

  const playlist = await prisma.createPlaylist.findUnique({
    where: { id }
  })

  return {
    props: { playlist }
  }
}

export const getStaticPaths = async () => {
  const prisma = new PrismaClient()
  const playlists = await prisma.createPlaylist.findMany()

  const paths = playlists?.map((playlist) => ({
    params: { id: playlist.id.toString() }
  }))

  return {
    paths,
    fallback: false
  }
}
