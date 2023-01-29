import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { type NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import { memo, useRef } from 'react'
import styles from './Dropdown.module.scss'

interface IProps {
  open: boolean
  setOpen: (value: boolean) => void
}

const Dropdown: NextPage<IProps> = ({ open, setOpen }) => {
  const { data: sessionData } = useSession()

  const dropdownRef = useRef<HTMLButtonElement>(null)

  useOnClickOutside(dropdownRef, () => setOpen(false))

  return (
    <>
      {open && (
        <button
          ref={dropdownRef}
          className={styles.dropdown}
          onClick={sessionData ? () => void signOut() : () => void signIn()}>
          {sessionData ? 'Выйти' : 'Войти'}
        </button>
      )}
    </>
  )
}

export default memo(Dropdown)
