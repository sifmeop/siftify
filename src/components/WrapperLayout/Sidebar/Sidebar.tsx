import type { IPlaylistLink } from '@/types/playlistLink.type'
import { type NextPage } from 'next'
import Logo from './Logo/Logo'
import MenuList from './MenuList/MenuList'
import PlaylistList from './PlaylistList/PlaylistList'
import Separator from './Separator/Separator'
import styles from './Sidebar.module.scss'

const Sidebar: NextPage = () => {
  const playlistLinks: IPlaylistLink[] = [
    { name: 'Мой топ 2022', path: '/playlist/asd1' },
    { name: 'Мой топ 2021', path: '/playlist/asd2' },
    { name: 'Радар новинок', path: '/playlist/asd3' },
    { name: 'sad songs', path: '/playlist/asd4' },
    { name: 'Ambient music', path: '/playlist/asd5' }
  ]

  return (
    <div className={styles.sidebar}>
      <Logo />
      <Separator title='Меню' />
      <MenuList />
      <Separator title='Плейлисты' />
      <PlaylistList list={playlistLinks} />
    </div>
  )
}

export default Sidebar
