import ArrowDown from '@/assets/icons/arrow-down.svg'
import LoaderAccount from '@/components/ui/Loaders/LoaderAccount/LoaderAccount'
import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import styles from './Account.module.scss'
import Dropdown from './Dropdown/Dropdown'

const Account: NextPage = () => {
  const { data: sessionData, status } = useSession()
  const [open, setOpen] = useState<boolean>(false)

  if (status === 'loading') {
    return <LoaderAccount />
  }

  return (
    <>
      <div className={styles.account} onClick={() => setOpen((prev) => !prev)}>
        {sessionData?.user?.name ?? 'Гость'}
        {sessionData?.user?.image ? (
          <Image
            width={48}
            height={48}
            className={styles.avatar}
            src={sessionData?.user?.image}
            alt='Изображение пользователя'
          />
        ) : (
          <div className={styles.avatar} />
        )}
        <ArrowDown />
        <Dropdown open={open} setOpen={setOpen} />
      </div>
    </>
  )
}

export default Account
