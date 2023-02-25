import { useBurgerMenu } from '@/stores/useBurgerMenu'
import { type IMenuLink } from '@/types/menuLink.interface'
import { clsx } from 'clsx'
import { type NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './MenuItem.module.scss'

interface IProps {
  item: IMenuLink
}

const MenuItem: NextPage<IProps> = ({ item }) => {
  const router = useRouter()
  const setOpen = useBurgerMenu(state=>state.setOpen)

  return (
    <li className={styles.list}>
      <Link
        href={item.path}
        className={clsx(styles.link, {
          [styles.active as string]: router.pathname === item.path
        })}
        onClick={setOpen}
        >
        {<item.icon size='1.5625rem' />}
        {item.name}
      </Link>
    </li>
  )
}

export default MenuItem
