import type { GetStaticProps, NextPage } from 'next'
import type { Playlist as PlaylistType, Track } from '@prisma/client'

import Meta from '@/utils/Meta'
import Playlist from '@/components/screens/playlist/Playlist'
import { PrismaClient } from '@prisma/client'

interface IProps {
  playlist: (PlaylistType & { tracks: Track[] }) | null
}

const PlaylistPage: NextPage<IProps> = ({ playlist }) => {
  return (
    <>
      <Meta
        title={`Плейлист: ${String(playlist?.name)}`}
        description={`Плейлист под названием: ${String(playlist?.name)}}`}
      />
      <Playlist playlist={playlist} />
    </>
  )
}

export default PlaylistPage

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string
  const prisma = new PrismaClient()

  const playlist = await prisma.playlist.findUnique({
    where: { id },
    include: { tracks: true }
  })

  return {
    props: { playlist },
    revalidate: 1
  }
}

export const getStaticPaths = async () => {
  const prisma = new PrismaClient()

  const playlists = await prisma.playlist.findMany()

  const paths = playlists.map((playlist) => ({
    params: { id: playlist.id }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}
