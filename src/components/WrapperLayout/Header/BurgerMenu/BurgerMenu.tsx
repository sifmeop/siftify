import { useBurgerMenu } from '@/stores/useBurgerMenu'
import clsx from 'clsx'
import type { NextPage } from 'next'
import styles from './BurgerMenu.module.scss'

const BurgerMenu: NextPage = () => {
  const isOpen = useBurgerMenu((state) => state.isOpen)
  const setOpen = useBurgerMenu((state) => state.setOpen)

  return (
    <button
      className={clsx(styles.burgerMenu, {
        [styles.active as string]: isOpen
      })}
      onClick={setOpen}>
      <span></span>
    </button>
  )
}

export default BurgerMenu
