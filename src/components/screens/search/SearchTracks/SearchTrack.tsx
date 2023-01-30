import Image from 'next/image'
import Link from 'next/link'
import type { NextPage } from 'next'
import { Track } from '@prisma/client'
import styles from './SearchTrack.module.scss'

interface IProps {
  track: Track
}

const SearchTrack: NextPage<IProps> = ({ track }) => {
  return (
    <div className={styles.track}>
      <Image width={70} height={70} src={`/${track.image}`} alt={track.title} />
      <div>
        <h1 className={styles.title}>
          <Link href={`/track/${track.id}`}>{track.title}</Link>
        </h1>
        <h2 className={styles.featuring}>{track.featuring.join(', ')}</h2>
      </div>
    </div>
  )
}

export default SearchTrack
