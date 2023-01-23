import type { IPlaylistLink } from '@/types/playlistLink.type'
import { clsx } from 'clsx'
import { type NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './PlaylistItem.module.scss'

interface IProps {
  item: IPlaylistLink
}

const PlaylistItem: NextPage<IProps> = ({ item }) => {
  const router = useRouter()

  return (
    <li className={styles.list}>
      <Link
        href={item.path}
        className={clsx(styles.link, {
          [styles.active]: router.asPath.split('?')[0] === item.path
        })}>
        {item.name}
      </Link>
    </li>
  )
}

export default PlaylistItem
