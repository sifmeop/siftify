import { type NextPage } from 'next'
import Image from 'next/image'
import LogoIcon from '../../../../../public/Logo.png'
import styles from './Logo.module.scss'

const Logo: NextPage = () => {
  return (
    <div className={styles.logo}>
      <Image
        width={70}
        height={70}
        src={LogoIcon}
        alt='Логотип Siftify'
        placeholder='blur'
      />
      <h1 className={styles.name}>Siftify</h1>
    </div>
  )
}

export default Logo
