import ArrowLeft from '@/assets/icons/go-back.svg'
import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from './GoBack.module.scss'

const GoBack: NextPage = () => {
  const router = useRouter()

  return <ArrowLeft className={styles.button} onClick={() => router.back()} />
}

export default GoBack
