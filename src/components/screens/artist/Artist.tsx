import ArtistCard from '@/components/ArtistCard/ArtistCard'
import Checkmark from 'assets/icons/checkmark.svg'
import type { NextPage } from 'next'
import TableMusicList from '@/components/TableMusicList/TableMusicList'
import type { Artist as TypeArtist } from '@prisma/client'
import { api } from '@/utils/api'
import { checkTracksLength } from '@/utils/checkTracksLength'

interface IProps {
  artist: TypeArtist
}

const Artist: NextPage<IProps> = ({ artist }) => {
  const { data: tracks } = api.tracks.getArtistTracks.useQuery({
    artistId: artist.id
  })

  return (
    <div>
      <ArtistCard
        size={300}
        image={artist.image}
        name={artist.name}
        type={
          <>
            <Checkmark />
            Подтвержденный исполнитель
          </>
        }
        title={artist.name}
        info={`${tracks?.length} ${checkTracksLength(tracks?.length)}`}
      />
      <div></div>
      <TableMusicList artistId={artist.id} />
    </div>
  )
}

export default Artist
