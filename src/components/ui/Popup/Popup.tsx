import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import type { NextPage } from 'next'
import type { PropsWithChildren } from 'react'
import { useRef } from 'react'
import { MdClose } from 'react-icons/md'
import styles from './Popup.module.scss'

interface IProps {
  onClose: (value: boolean) => void
}

const Popup: NextPage<PropsWithChildren<IProps>> = ({ children, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(popupRef, () => onClose(false))

  return (
    <div className={styles.popup}>
      <div ref={popupRef} className={styles.popupInner}>
        <button className={styles.popupClose} onClick={() => onClose(false)}>
          <MdClose size='2rem' />
        </button>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Popup
