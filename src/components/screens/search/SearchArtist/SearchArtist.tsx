import { Artist } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import type { NextPage } from 'next'
import styles from './SearchArtist.module.scss'

interface IProps {
  artist: Artist
}

const SearchArtist: NextPage<IProps> = ({ artist }) => {
  return (
    <div className={styles.artist}>
      <Image
        className='rounded-full'
        width={70}
        height={70}
        src={`/${artist.image}`}
        alt={artist.name}
      />
      <h1 className={styles.name}>
        <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
      </h1>
    </div>
  )
}

export default SearchArtist
