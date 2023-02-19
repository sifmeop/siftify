import { useFavorites } from '@/stores/useFavorites'
import { api } from '@/utils/api'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import Header from './Header/Header'
import Main from './Main/Main'
import MusicPlayer from './MusicPlayer/MusicPlayer'
import Sidebar from './Sidebar/Sidebar'
import styles from './WrapperLayout.module.scss'

const WrapperLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const { data: sessionData } = useSession()
  const userId = String(sessionData?.user?.id)

  const setFavorites = useFavorites((state) => state.setFavorites)

  const { data: favorites } = api.favorites.getListFavorites.useQuery(
    { userId },
    { enabled: !!sessionData }
  )

  useEffect(() => {
    if (favorites) {
      setFavorites(favorites)
    }
  }, [favorites, setFavorites])

  return (
    <>
      <Sidebar />
      <div className={styles.wrapper}>
        <Header />
        <Main>{children}</Main>
      </div>
      <MusicPlayer />
    </>
  )
}

export default WrapperLayout
