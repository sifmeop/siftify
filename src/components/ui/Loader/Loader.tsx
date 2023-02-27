import type { NextPage } from 'next'
import styles from './Loader.module.scss'

const Loader: NextPage = () => {
  return (
    <div className={styles.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loader
