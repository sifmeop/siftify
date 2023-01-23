import { type NextPage } from 'next'
import Account from './Account/Account'
import GoBack from './GoBack/GoBack'
import styles from './Header.module.scss'

const Header: NextPage = () => {
  return (
    <div className={styles.header}>
      <GoBack />
      <Account />
    </div>
  )
}

export default Header
