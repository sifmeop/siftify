import type { Artist as TypeArtist, Track } from '@prisma/client'

import ArtistCard from '@/components/ArtistCard/ArtistCard'
import { checkTracksLength } from '@/utils/checkTracksLength'
import Checkmark from 'assets/icons/checkmark.svg'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from './Artist.module.scss'
import PopupTracks from './PopupTracks/PopupTracks'

interface IProps {
  artist: TypeArtist & { tracks: Track[] }
}

const Artist: NextPage<IProps> = ({ artist }) => {
  const [showMore, setShowMore] = useState<boolean>(false)

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
          artist.tracks
            ? `${String(artist.tracks.length)} ${checkTracksLength(
                artist.tracks.length
              )}`
            : ''
        }
      />
      <div className={styles.tracksSection}>
        <div className='mb-5 flex justify-between'>
          <h2>Треки</h2>
          {artist.tracks && artist.tracks.length > 4 && (
            <button
              className={styles.showMore}
              onClick={() => setShowMore(true)}>
              Показать ещё <span>+{artist.tracks.length - 4}</span>
            </button>
          )}
        </div>
        <div className={styles.tracks}>
          {artist.tracks.slice(0, 4).map((track) => (
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
              <h1 className={styles.title}>
                <Link href={`/track/${track.id}`}>{track.title}</Link>
              </h1>
              <p className={styles.featuring}>{track.featuring.join(', ')}</p>
            </div>
          ))}
        </div>
        <PopupTracks
          artist={artist.name}
          tracks={artist.tracks}
          setState={setShowMore}
          state={showMore}
        />
      </div>
    </div>
  )
}

export default Artist
