import TableMusicList from '@/components/TableMusicList/TableMusicList'
import { api } from '@/utils/api'
import { type NextPage } from 'next'
import Image from 'next/image'
import styles from './Home.module.scss'

const Home: NextPage = () => {
  const { data: artists } = api.artists.getAll.useQuery()

  return (
    <div>
      {artists?.map((artist) => (
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
            <h1 className={styles.name}>{artist.name}</h1>
          </div>
          <TableMusicList artistId={artist.id} />
        </div>
      ))}
    </div>
  )
}

export default Home
