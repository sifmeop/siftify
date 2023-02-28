import { useBurgerMenu } from '@/stores/useBurgerMenu'
import type { Playlist } from '@prisma/client'
import { clsx } from 'clsx'
import { type NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './PlaylistItem.module.scss'

interface IProps {
  item: Playlist
}

const PlaylistItem: NextPage<IProps> = ({ item }) => {
  const router = useRouter()
  const setOpen = useBurgerMenu((state) => state.setOpen)

  return (
    <li className={styles.list}>
      <Link
        href={`/playlist/${item.id}`}
        className={clsx(styles.link, {
          [styles.active as string]: router.query.id === item.id
        })}
        onClick={setOpen}>
        {item.name}
      </Link>
    </li>
  )
}

export default PlaylistItem
