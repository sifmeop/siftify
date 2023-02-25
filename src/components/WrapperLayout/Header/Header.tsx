import { type NextPage } from 'next'
import Account from './Account/Account'
import BurgerMenu from './BurgerMenu/BurgerMenu'
import GoBack from './GoBack/GoBack'
import styles from './Header.module.scss'

const Header: NextPage = () => {
  return (
    <div className={styles.header}>
      <GoBack />
      <BurgerMenu />
      <Account />
    </div>
  )
}

export default Header
