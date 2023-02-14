import ArtistTrackList from '@/components/ArtistTrackList/ArtistTrackList'
import Loader from '@/components/ui/Loader/Loader'
import { api } from '@/utils/api'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Home.module.scss'

const Home: NextPage = () => {
  const { data: artists } = api.artists.getAll.useQuery()

  return (
    <>
      {artists ? (
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
              />
              <h1 className={styles.name}>
                <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
              </h1>
            </div>
            <ArtistTrackList artistId={artist.id} />
          </div>
        ))
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Home
