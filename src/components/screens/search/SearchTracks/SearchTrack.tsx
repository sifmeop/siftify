import type { Track } from '@prisma/client'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './SearchTrack.module.scss'

interface IProps {
  track: Track
}

const SearchTrack: NextPage<IProps> = ({ track }) => {
  return (
    <Link href={`/track/${track.id}`} className={styles.track}>
      <Image
        width={70}
        height={70}
        src={`/${track.image}`}
        alt={track.title}
        priority
      />
      <div>
        <h1 className={styles.title}>{track.title}</h1>
        <h2 className={styles.featuring}>{track.featuring.join(', ')}</h2>
      </div>
    </Link>
  )
}

export default SearchTrack
