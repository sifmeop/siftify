import { usePlayer } from '@/stores/usePlayer'
import clsx from 'clsx'
import type { NextPage } from 'next'
import type { PropsWithChildren } from 'react'
import styles from './Main.module.scss'

const Main: NextPage<PropsWithChildren> = ({ children }) => {
  const currentTrack = usePlayer((state) => state.currentTrack)
  return (
    <div
      className={clsx(styles.main, {
        ['mb-[6.25rem]']: currentTrack
      })}>
      {children}
    </div>
  )
}

export default Main
