import type { NextPage } from 'next'
import type { PropsWithChildren } from 'react'
import clsx from 'clsx'
import styles from './Main.module.scss'
import { usePlayer } from '@/stores/usePlayer'

const Main: NextPage<PropsWithChildren> = ({ children }) => {
  const currentSong = usePlayer((state) => state.currentSong)
  return (
    <div
      className={clsx(styles.main, {
        'mb-[6.25rem]': currentSong
      })}>
      {children}
    </div>
  )
}

export default Main
