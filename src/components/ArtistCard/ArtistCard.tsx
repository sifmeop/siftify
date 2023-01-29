import Image from 'next/image'
import type { NextPage } from 'next'
import styles from './ArtistCard.module.scss'

interface IProps {
  size: 150 | 300
  image: string
  name: string
  type?: string | JSX.Element
  title?: string
  info: string | JSX.Element
}

const ArtistCard: NextPage<IProps> = ({
  size,
  image,
  name,
  type,
  title,
  info
}) => {
  return (
    <div className={styles.artist}>
      <Image
        width={size}
        height={size}
        src={`/${image}`}
        alt={name}
        placeholder='blur'
        blurDataURL={`/${image}`}
      />
      <div className={styles.artistInfo}>
        <h2 className={styles.type}>{type}</h2>
        <h1 className={styles.name}>{title}</h1>
        <h3 className={styles.info}>{info}</h3>
      </div>
    </div>
  )
}

export default ArtistCard
