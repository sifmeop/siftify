import type { GetStaticProps, NextPage } from 'next'

import type { Track as ITrack } from '@prisma/client'
import Meta from '@/utils/Meta'
import { PrismaClient } from '@prisma/client'
import Track from '@/components/screens/track/Track'

interface IProps {
  track: ITrack
}

const TrackPage: NextPage<IProps> = ({ track }) => {
  return (
    <>
      <Meta
        title={track.title}
        description={`Песня под названием ${track.title}`}
      />
      <Track track={track} />
    </>
  )
}

export default TrackPage

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string
  const prisma = new PrismaClient()
  const track = await prisma.track.findUnique({
    where: { id }
  })

  return {
    props: { track }
  }
}

export const getStaticPaths = async () => {
  const prisma = new PrismaClient()
  const tracks = await prisma.track.findMany()

  const paths = tracks?.map((track) => ({
    params: { id: track.id.toString() }
  }))

  return {
    paths,
    fallback: false
  }
}
