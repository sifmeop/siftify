import type { NextPage } from 'next'
import styles from './Loader.module.scss'

const Loader: NextPage = () => {
  return <span className={styles.loader} />
}

export default Loader
