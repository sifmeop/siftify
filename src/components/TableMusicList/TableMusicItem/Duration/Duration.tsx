import type { NextPage } from 'next'
import type { Track } from '@prisma/client'
import { memo } from 'react'
import styles from './Duration.module.scss'
import { useDuration } from '@/hooks/useDuration'

interface IProps {
  track: Track
}

const Duration: NextPage<IProps> = ({ track }) => {
  const duration = useDuration(track, 'short')

  return <div className={styles.duration}>{duration}</div>
}

export default memo(Duration)
