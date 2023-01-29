/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import CreatePlaylist from '@/assets/icons/add.svg'
import Home from '@/assets/icons/home.svg'
import LikedSongs from '@/assets/icons/liked-songs.svg'
import Search from '@/assets/icons/search.svg'
import Library from '@/assets/icons/your-library.svg'
import { type IMenuLink } from '@/types/menuLink.interface'

export const menuLinks: IMenuLink[] = [
  { name: 'Главная', path: '/', icon: Home },
  { name: 'Поиск', path: '/search', icon: Search },
  { name: 'Моя медиатека', path: '/your-library', icon: Library },
  { name: 'Любимые треки', path: '/liked-songs', icon: LikedSongs },
  { name: 'Создать плейлист', path: '/create-playlist', icon: CreatePlaylist }
]
