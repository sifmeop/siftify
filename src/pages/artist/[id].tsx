import type { GetStaticProps, NextPage } from 'next'

import Artist from '@/components/screens/artist/Artist'
import Meta from '@/utils/Meta'
import { PrismaClient } from '@prisma/client'
import type { Artist as TypeArtist } from '@prisma/client'

interface IProps {
  artist: TypeArtist
}

const ArtistPage: NextPage<IProps> = ({ artist }) => {
  return (
    <>
      <Meta
        title={artist.name}
        description={`Треки исполнителя ${artist.name}`}
      />
      <Artist artist={artist} />
    </>
  )
}

export default ArtistPage

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string
  const prisma = new PrismaClient()
  const artist = await prisma.artist.findUnique({
    where: { id }
  })

  return {
    props: { artist }
  }
}

export const getStaticPaths = async () => {
  const prisma = new PrismaClient()
  const artists = await prisma.artist.findMany()

  const paths = artists?.map((artist) => ({
    params: { id: artist.id.toString() }
  }))
  return {
    paths,
    fallback: false
  }
}
