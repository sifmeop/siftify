import LoaderDuration from '@/components/ui/Loaders/LoaderDuration/LoaderDuration'
import { useDuration } from '@/hooks/useDuration'
import type { Track } from '@prisma/client'
import type { NextPage } from 'next'
import { memo } from 'react'
import styles from './Duration.module.scss'

interface IProps {
  track: Track
}

const Duration: NextPage<IProps> = ({ track }) => {
  const duration = useDuration(track, 'short')

  return (
    <>
      {duration ? (
        <div className={styles.duration}>{duration}</div>
      ) : (
        <LoaderDuration />
      )}
    </>
  )
}

export default memo(Duration)
