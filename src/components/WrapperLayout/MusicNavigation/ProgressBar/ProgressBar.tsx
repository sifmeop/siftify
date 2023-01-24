import { useEffect, useRef, useState } from 'react'

import type { MouseEvent } from 'react'
import type { NextPage } from 'next'
import styles from './ProgressBar.module.scss'
import { usePlayer } from '@/stores/usePlayer'

const ProgressBar: NextPage = () => {
  const audioSrc = usePlayer((state) => state.audioSrc)
  const [trackProgress, setTrackProgress] = useState<number>(0)

  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioSrc) {
        setTrackProgress((audioSrc.currentTime / audioSrc.duration) * 100)
      }
    }
    audioSrc?.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audioSrc?.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audioSrc])

  const handleRewindTime = (e: MouseEvent<HTMLDivElement>) => {
    const width = progressRef.current?.offsetWidth
    if (!width) return
    const offset = e.nativeEvent.offsetX
    const progress = (offset / width) * 100
    if (audioSrc) {
      audioSrc.currentTime = progress * (audioSrc.duration / 100)
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
