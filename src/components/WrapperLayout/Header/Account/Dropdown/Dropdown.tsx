import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { type NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRef } from 'react'
import styles from './Dropdown.module.scss'

interface IProps {
  setOpen: (value: boolean) => void
}

const Dropdown: NextPage<IProps> = ({ setOpen }) => {
  const { data: sessionData } = useSession()

  const dropdownRef = useRef<HTMLButtonElement>(null)

  useOnClickOutside(dropdownRef, () => setOpen(false))

  return (
    <button
      ref={dropdownRef}
      className={styles.dropdown}
      onClick={sessionData ? () => void signOut() : () => void signIn()}>
      {sessionData ? 'Sign Out' : 'Sign In'}
    </button>
  )
}

export default Dropdown
