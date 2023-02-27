import { usePlayer } from '@/stores/usePlayer'
import Pause from 'assets/icons/pause-big.svg'
import Play from 'assets/icons/play-big.svg'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import styles from './PlayTrack.module.scss'

const PlayTrack: NextPage = () => {
  const isPlaying = usePlayer((state) => state.isPlaying)
  const audio = usePlayer((state) => state.audio)
  const togglePlay = usePlayer((state) => state.togglePlay)

  useEffect(() => {
    if (isPlaying) {
      void audio?.play()
    } else {
      void audio?.pause()
    }
  }, [audio, isPlaying])

  return (
    <>
      {isPlaying ? (
        <div className={styles.icon}>
          <Pause className='player-button' onClick={() => togglePlay(false)} />
        </div>
      ) : (
        <div className={styles.icon}>
          <Play className='player-button' onClick={() => togglePlay(true)} />
        </div>
      )}
    </>
  )
}

export default PlayTrack
