import { useEffect, useState } from 'react'

import type { NextPage } from 'next'
import VolumeHigh from 'assets/icons/volume-highest.svg'
import VolumeMedium from 'assets/icons/volume-half.svg'
import VolumeNone from 'assets/icons/volume-silent.svg'
import styles from './VolumeChange.module.scss'
import { usePlayer } from '@/stores/usePlayer'

const VolumeChange: NextPage = () => {
  const volume = usePlayer((state) => state.volume)
  const setVolume = usePlayer((state) => state.setVolume)
  const audioSrc = usePlayer((state) => state.audioSrc)
  const [prevStateVolume, setPrevStateVolume] = useState<number>(volume)

  useEffect(() => {
    if (audioSrc) {
      if (volume === 0) {
        audioSrc.muted = true
      } else {
        audioSrc.muted = false
        audioSrc.volume = volume / 100
      }
    }
  }, [audioSrc, volume])

  const handleChangeVolume = () => {
    if (volume === 0) {
      return <VolumeNone onClick={() => setVolume(prevStateVolume)} />
    } else if (volume > 0 && volume <= 50) {
      return <VolumeMedium onClick={handlePrevSaveVolume} />
    } else {
      return <VolumeHigh onClick={handlePrevSaveVolume} />
    }
  }

  const handlePrevSaveVolume = () => {
    setVolume(0)
    setPrevStateVolume(volume)
  }

  return (
    <div className={styles.volume}>
      {handleChangeVolume()}
      <input
        style={{
          background: `linear-gradient(to right, #47B5FF ${
            (volume / 100) * 100
          }%, #dedede ${(volume / 100) * 100}%)`
        }}
        className={styles.volumeRange}
        type='range'
        min={0}
        max={100}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
    </div>
  )
}

export default VolumeChange
