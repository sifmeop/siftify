import { useBurgerMenu } from '@/stores/useBurgerMenu'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import BurgerMenu from '../Header/BurgerMenu/BurgerMenu'
import Logo from './Logo/Logo'
import MenuList from './MenuList/MenuList'
import PlaylistList from './PlaylistList/PlaylistList'
import Separator from './Separator/Separator'
import styles from './Sidebar.module.scss'

const Sidebar: NextPage = () => {
  const isOpen = useBurgerMenu((state) => state.isOpen)
  const { data: sessionData } = useSession()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div
      className={clsx(styles.sidebar, {
        [styles.active as string]: isOpen
      })}>
      <div className='flex items-center justify-between'>
        <Logo />
        <BurgerMenu />
      </div>
      <Separator title='Меню' />
      <MenuList />
      {sessionData && (
        <>
          <Separator title='Плейлисты' />
          <PlaylistList />
        </>
      )}
    </div>
  )
}

export default Sidebar
