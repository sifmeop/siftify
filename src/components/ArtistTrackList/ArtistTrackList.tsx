import { api } from '@/utils/api'
import type { NextPage } from 'next'
import TableHeader from '../TableHeader/TableHeader'
import TrackItem from '../TrackItem/TrackItem'
import LoaderTrack from '../ui/Loaders/LoaderTrack/LoaderTrack'

interface IProps {
  artistId: string
}

const ArtistTrackList: NextPage<IProps> = ({ artistId }) => {
  const { data: tracks } = api.tracks.getArtistTracks.useQuery({ artistId })

  return (
    <div>
      <TableHeader />
      <div>
        {tracks ? (
          tracks.map((track, index) => (
            <TrackItem key={track.id} track={track} index={index} />
          ))
        ) : (
          <LoaderTrack />
        )}
      </div>
    </div>
  )
}

export default ArtistTrackList
