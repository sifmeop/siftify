import { type NextPage } from 'next'
import { type PropsWithChildren } from 'react'
import Header from './Header/Header'
import Main from './Main/Main'
import MusicNavigation from './MusicNavigation/MusicNavigation'
import Sidebar from './Sidebar/Sidebar'
import styles from './WrapperLayout.module.scss'

const WrapperLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className={styles.wrapper}>
        <Header />
        <Main>{children}</Main>
      </div>
      <MusicNavigation />
    </>
  )
}

export default WrapperLayout
