import ArtistCard from '@/components/ArtistCard/ArtistCard'
import { api } from '@/utils/api'
import { checkTracksLength } from '@/utils/checkTracksLength'
import type { Artist as TypeArtist } from '@prisma/client'
import Checkmark from 'assets/icons/checkmark.svg'
import clsx from 'clsx'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from './Artist.module.scss'
import PopupTracks from './PopupTracks/PopupTracks'

interface IProps {
  artist: TypeArtist
}

const Artist: NextPage<IProps> = ({ artist }) => {
  const [showMore, setShowMore] = useState<boolean>(false)

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
        info={
          tracks
            ? `${String(tracks.length)} ${checkTracksLength(tracks?.length)}`
            : ''
        }
      />
      <div className={styles.tracksSection}>
        <div className='mb-5 flex justify-between'>
          <h2>Треки</h2>
          {tracks && tracks.length > 4 && (
            <button
              className={styles.showMore}
              onClick={() => setShowMore(true)}>
              Показать ещё <span>+{tracks?.length - 4}</span>
            </button>
          )}
        </div>
        <div className={styles.tracks}>
          {tracks?.slice(0, 4).map((track) => (
            <div key={track.id} className={styles.track}>
              <Link href={`/track/${track.id}`}>
                <Image
                  className={styles.image}
                  width={200}
                  height={200}
                  src={`/${track.image}`}
                  alt={`Picture of the track ${track.title}`}
                  priority
                />
              </Link>
              <h1 className={clsx(styles.title, styles.ellipsis)}>
                <Link href={`/track/${track.id}`}>{track.title}</Link>
              </h1>
              <p className={clsx(styles.featuring, styles.ellipsis)}>
                {track.featuring.join(', ')}
              </p>
            </div>
          ))}
        </div>
        <PopupTracks
          artist={artist.name}
          tracks={tracks}
          setState={setShowMore}
          state={showMore}
        />
      </div>
    </div>
  )
}

export default Artist
