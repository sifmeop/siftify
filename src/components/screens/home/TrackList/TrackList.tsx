import type { Track } from '@prisma/client'
import type { NextPage } from 'next'
import TableHeader from '../../../TableHeader/TableHeader'
import TrackItem from '../../../TrackItem/TrackItem'
import LoaderTrack from '../../../ui/Loaders/LoaderTrack/LoaderTrack'

interface IProps {
  tracks: Track[]
}

const TrackList: NextPage<IProps> = ({ tracks }) => {
  return (
    <>
      <TableHeader />
      {tracks && tracks.length ? (
        tracks.map((track, index) => (
          <TrackItem key={track.id} track={track} index={index} />
        ))
      ) : (
        <LoaderTrack />
      )}
    </>
  )
}

export default TrackList
