import { useEffect, useRef, useState } from 'react'

import { usePlayer } from '@/stores/usePlayer'
import type { NextPage } from 'next'
import type { MouseEvent } from 'react'
import styles from './ProgressBar.module.scss'

const ProgressBar: NextPage = () => {
  const audio = usePlayer((state) => state.audio)
  const [trackProgress, setTrackProgress] = useState<number>(0)

  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audio) {
        setTrackProgress((audio.currentTime / audio.duration) * 100)
      }
    }
    audio?.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audio?.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audio])

  const handleRewindTime = (e: MouseEvent<HTMLDivElement>) => {
    const width = progressRef.current?.offsetWidth
    if (!width) return
    const offset = e.nativeEvent.offsetX
    const progress = (offset / width) * 100
    if (audio) {
      audio.currentTime = progress * (audio.duration / 100)
      setTrackProgress(progress)
    }
  }

  return (
    <div
      ref={progressRef}
      className={styles.progress}
      onClick={handleRewindTime}>
      <div
        style={{ width: `${trackProgress}%` }}
        className={styles.progressCompleted}
      />
    </div>
  )
}

export default ProgressBar
