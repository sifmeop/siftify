import type { NextPage } from 'next'
import VolumeHigh from 'assets/icons/volume-highest.svg'
import VolumeMedium from 'assets/icons/volume-half.svg'
import VolumeNone from 'assets/icons/volume-silent.svg'
import styles from './Volume.module.scss'
import { useEffect } from 'react'
import { usePlayer } from '@/stores/usePlayer'

const Volume: NextPage = () => {
  const volume = usePlayer((state) => state.volume)
  const setVolume = usePlayer((state) => state.setVolume)
  const audioSrc = usePlayer((state) => state.audioSrc)

  const handleVolume = () => {
    if (volume === 0) {
      return <VolumeNone />
    } else if (volume > 0 && volume <= 50) {
      return <VolumeMedium />
    } else {
      return <VolumeHigh />
    }
  }

  useEffect(() => {
    if (audioSrc?.volume) {
      audioSrc.volume = volume / 100
    }
  }, [audioSrc, volume])

  return (
    <div className={styles.volume}>
      {handleVolume()}
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

export default Volume
