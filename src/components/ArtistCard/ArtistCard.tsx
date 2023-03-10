import clsx from 'clsx'
import type { NextPage } from 'next'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import styles from './ArtistCard.module.scss'

interface IProps {
  size: 150 | 300
  image: string | StaticImageData
  name: string
  type?: 'СИНГЛ' | 'ПЛЕЙЛИСТ' | JSX.Element
  title?: string
  info: string | JSX.Element | undefined | null
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
        quality={100}
        priority
      />
      <div className={styles.artistInfo}>
        <h2 className={styles.type}>{type}</h2>
        <h1
          className={clsx(styles.title, {
            ['mb-10']: info
          })}>
          {title}
        </h1>
        {info && <h3 className={styles.info}>{info}</h3>}
      </div>
    </div>
  )
}

export default ArtistCard
