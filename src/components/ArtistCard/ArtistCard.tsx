import Image from 'next/image'
import type { NextPage } from 'next'
import type { StaticImageData } from 'next/image'
import clsx from 'clsx'
import styles from './ArtistCard.module.scss'

interface IProps {
  size: 150 | 300
  image: string | StaticImageData
  name: string
  type?: 'СИНГЛ' | 'ПЛЕЙЛИСТ' | JSX.Element
  title?: string
  info: string | JSX.Element | undefined
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
        className={clsx({
          'rounded-full': type !== 'ПЛЕЙЛИСТ' && type !== 'СИНГЛ'
        })}
        width={size}
        height={size}
        src={typeof image === 'string' ? `/${image}` : image}
        alt={name}
        placeholder='blur'
        blurDataURL={`/${image}`}
        quality={100}
      />
      <div className={styles.artistInfo}>
        <h2 className={styles.type}>{type}</h2>
        <h1 className={styles.title}>{title}</h1>
        <h3 className={styles.info}>{info}</h3>
      </div>
    </div>
  )
}

export default ArtistCard
