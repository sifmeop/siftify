import { type NextPage } from 'next'
import type { PropsWithChildren } from 'react'
import styles from './Main.module.scss'

const Main: NextPage<PropsWithChildren> = ({ children }) => {
  return <div className={styles.main}>{children}</div>
}

export default Main
