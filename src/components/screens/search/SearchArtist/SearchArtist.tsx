import type { Artist } from '@prisma/client'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './SearchArtist.module.scss'

interface IProps {
  artist: Artist
}

const SearchArtist: NextPage<IProps> = ({ artist }) => {
  return (
    <Link href={`/artist/${artist.id}`} className={styles.artist}>
      <Image
        className='rounded-full'
        width={70}
        height={70}
        src={`/${artist.image}`}
        alt={artist.name}
        priority
      />
      <h1 className={styles.name}>{artist.name}</h1>
    </Link>
  )
}

export default SearchArtist
