import type { Artist, Track } from '@prisma/client'

import Image from 'next/image'
import Link from 'next/link'
import Loader from '@/components/ui/Loaders/Loader/Loader'
import type { NextPage } from 'next'
import TrackList from '@/components/screens/home/TrackList/TrackList'
import styles from './Home.module.scss'

interface Props {
  artists: (Artist & { tracks: Track[] })[]
}

const Home: NextPage<Props> = ({ artists }) => {
  return (
    <>
      {artists.length ? (
        artists.map((artist) => (
          <div key={artist.id} className={styles.artist}>
            <div className={styles.artistInfo}>
              <Image
                width={150}
                height={150}
                src={`/${artist.image}`}
                alt={artist.name}
                placeholder='blur'
                blurDataURL={`/${artist.image}`}
                priority
              />
              <h1 className={styles.name}>
                <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
              </h1>
            </div>
            <TrackList tracks={artist.tracks} />
          </div>
        ))
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Home
