import ArrowDown from '@/assets/icons/arrow-down.svg'
import { type NextPage } from 'next'
import { useState } from 'react'
import styles from './Account.module.scss'
import Dropdown from './Dropdown/Dropdown'

const Account: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className={styles.account} onClick={() => setOpen((prev) => !prev)}>
        Guest
        <div className={styles.avatar} />
        <ArrowDown />
        {open && <Dropdown setOpen={setOpen} />}
      </div>
    </>
  )
}

export default Account
