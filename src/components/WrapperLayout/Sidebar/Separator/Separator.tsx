import { type NextPage } from 'next'
import styles from './Separator.module.scss'

interface IProps {
  title: string
}

const Separator: NextPage<IProps> = ({ title }) => {
  return (
    <div>
      <div className={styles.separator} />
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.separator} />
    </div>
  )
}

export default Separator
