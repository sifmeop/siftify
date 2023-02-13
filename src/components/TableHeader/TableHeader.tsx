import Duration from 'assets/icons/duration.svg'
import type { NextPage } from 'next'
import clsx from 'clsx'
import styles from './TableHeader.module.scss'

const TableHeader: NextPage = () => {
  return (
    <div className={styles.table}>
      <div className={clsx(styles.tableHeader, 'text-center')}>#</div>
      <div className={styles.tableHeader}>НАЗВАНИЕ</div>
      <div />
      <div className={styles.tableHeader}>
        <Duration className='mx-auto' />
      </div>
    </div>
  )
}

export default TableHeader
