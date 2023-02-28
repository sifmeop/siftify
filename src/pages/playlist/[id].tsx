import type { Playlist as PlaylistType, Track } from '@prisma/client'

import Playlist from '@/components/screens/playlist/Playlist'
import Meta from '@/utils/Meta'
import { PrismaClient } from '@prisma/client'
import type { GetStaticProps, NextPage } from 'next'

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
    props: { playlist }
  }
}

export const getStaticPaths = async () => {
  const prisma = new PrismaClient()

  const playlists = await prisma.playlist.findMany()

  return {
    paths: playlists.map((playlist) => ({
      params: { id: playlist.id }
    })),
    fallback: false
  }
}
