import TrackItem from '@/components/TrackItem/TrackItem'
import { api } from '@/utils/api'
import type { LikedTrack } from '@prisma/client'
import type { NextPage } from 'next'

interface IProps {
  track: LikedTrack
  index: number
}

const LikedTracksItem: NextPage<IProps> = ({ track, index }) => {
  const { data } = api.favorites.getTrackById.useQuery({
    trackId: track.trackId
  })

  return <>{data && <TrackItem key={track.id} track={data} index={index} />}</>
}

export default LikedTracksItem
