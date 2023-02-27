import { useBurgerMenu } from '@/stores/useBurgerMenu'
import { usePlayer } from '@/stores/usePlayer'
import clsx from 'clsx'
import type { NextPage } from 'next'
import BurgerMenu from '../Header/BurgerMenu/BurgerMenu'
import Logo from './Logo/Logo'
import MenuList from './MenuList/MenuList'
import PlaylistList from './PlaylistList/PlaylistList'
import styles from './Sidebar.module.scss'

const Sidebar: NextPage = () => {
  const currentTrack = usePlayer((state) => state.currentTrack)
  const isOpen = useBurgerMenu((state) => state.isOpen)

  // useEffect(() => {
  // if (isOpen) {
  // document.body.style.overflow = 'hidden'
  // }
  // return () => {
  // document.body.style.overflow = 'scroll'
  // }
  // }, [isOpen])

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
      <PlaylistList />
    </div>
  )
}

export default Sidebar
