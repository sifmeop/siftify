import ArrowLeft from '@/assets/icons/go-back.svg'
import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from './GoBack.module.scss'

const GoBack: NextPage = () => {
  const router = useRouter()

  return (
    <div className={styles.wrapper}>
      <ArrowLeft className={styles.goBack} onClick={() => router.back()} />
    </div>
  )
}

export default GoBack
