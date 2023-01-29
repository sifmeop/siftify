import ArtistCard from '@/components/ArtistCard/ArtistCard'
import Checkmark from 'assets/icons/checkmark.svg'
import type { NextPage } from 'next'
import TableMusicList from '@/components/TableMusicList/TableMusicList'
import type { Artist as TypeArtist } from '@prisma/client'
import { api } from '@/utils/api'

interface IProps {
  artist: TypeArtist
}

const Artist: NextPage<IProps> = ({ artist }) => {
  const { data: tracks } = api.artists.getArtistTracks.useQuery({
    artistId: artist.id
  })

  const checkLength = (length: number | undefined): string => {
    if (!length) return 'треков'

    if (length === 1) {
      return 'трек'
    } else if (length > 1 && length < 5) {
      return 'трека'
    } else {
      return 'треков'
    }
  }

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
        info={`${String(tracks?.length)} ${checkLength(tracks?.length)}`}
      />
      <div></div>
      <TableMusicList artistId={artist.id} />
    </div>
  )
}

export default Artist
