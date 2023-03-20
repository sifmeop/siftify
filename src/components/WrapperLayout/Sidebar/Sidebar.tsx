import BurgerMenu from '../Header/BurgerMenu/BurgerMenu'
import Logo from './Logo/Logo'
import MenuList from './MenuList/MenuList'
import type { NextPage } from 'next'
import clsx from 'clsx'
import styles from './Sidebar.module.scss'
import { useBurgerMenu } from '@/stores/useBurgerMenu'
import { usePlayer } from '@/stores/usePlayer'

const Sidebar: NextPage = () => {
  const currentTrack = usePlayer((state) => state.currentTrack)
  const isOpen = useBurgerMenu((state) => state.isOpen)

  return (
    <div
      className={clsx(styles.sidebar, {
        [styles.active as string]: isOpen,
        ['pb-[6.7rem]']: currentTrack
      })}>
      <div className='flex items-center justify-between'>
        <Logo />
        <BurgerMenu />
      </div>
      <MenuList />
    </div>
  )
}

export default Sidebar
