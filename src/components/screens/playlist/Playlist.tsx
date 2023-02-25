import ArtistCard from '@/components/ArtistCard/ArtistCard'
import TableHeader from '@/components/TableHeader/TableHeader'
import type { CreatePlaylist } from '@prisma/client'
import CoverPlaylist from 'assets/images/cover-playlist.jpg'
import type { NextPage } from 'next'

interface IProps {
  playlist: CreatePlaylist
}

const Playlist: NextPage<IProps> = ({ playlist }) => {
  return (
    <div>
      <ArtistCard
        image={CoverPlaylist}
        size={300}
        name={playlist.name}
        info={playlist.description}
        title={playlist.name}
        type='ПЛЕЙЛИСТ'
      />
      <TableHeader />
    </div>
  )
}

export default Playlist
