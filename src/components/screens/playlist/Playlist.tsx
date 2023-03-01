import type { Playlist as PlaylistType, Track } from '@prisma/client'

import ArtistCard from '@/components/ArtistCard/ArtistCard'
import TableHeader from '@/components/TableHeader/TableHeader'
import TrackItem from '@/components/TrackItem/TrackItem'
import Loader from '@/components/ui/Loaders/Loader/Loader'
import CoverPlaylist from 'assets/images/cover-playlist.jpg'
import type { NextPage } from 'next'
import DeletePlaylist from './DeletePlaylist/DeletePlaylist'
import EditPlaylist from './EditPlaylist/EditPlaylist'

interface IProps {
  playlist: (PlaylistType & { tracks: Track[] }) | null
}

const Playlist: NextPage<IProps> = ({ playlist }) => {
  return playlist ? (
    <>
      <ArtistCard
        image={CoverPlaylist}
        size={300}
        name={playlist.name}
        info={playlist.description}
        title={playlist.name}
        type='ПЛЕЙЛИСТ'
      />
      <div className='mb-2 flex items-center gap-3 p-1'>
        <EditPlaylist playlist={playlist} />
        <DeletePlaylist playlist={playlist} />
      </div>
      {playlist.tracks && playlist.tracks.length > 0 ? (
        <>
          <TableHeader />
          {playlist.tracks &&
            playlist.tracks.map((track, index) => (
              <TrackItem key={track.id} track={track} index={index} />
            ))}
        </>
      ) : (
        <h1 className='text-center text-2xl'>Плейлист пуст</h1>
      )}
    </>
  ) : (
    <Loader />
  )
}

export default Playlist
