import { useEffect, useState } from 'react'

import { usePlayer } from '@/stores/usePlayer'
import { Tooltip } from 'antd'
import VolumeHigh from 'assets/icons/volume-high.svg'
import VolumeLow from 'assets/icons/volume-low.svg'
import VolumeMedium from 'assets/icons/volume-medium.svg'
import VolumeNone from 'assets/icons/volume-none.svg'
import type { NextPage } from 'next'
import styles from './VolumeChange.module.scss'

const VolumeChange: NextPage = () => {
  const volume = usePlayer((state) => state.volume)
  const setVolume = usePlayer((state) => state.setVolume)
  const audio = usePlayer((state) => state.audio)
  const [prevStateVolume, setPrevStateVolume] = useState<number>(volume)

  useEffect(() => {
    const volumeFromLocalStorage = localStorage.getItem('volume')
    if (volumeFromLocalStorage) {
      setVolume(Number(volumeFromLocalStorage))
    }
  }, [])

  useEffect(() => {
    if (audio) {
      if (volume === 0) {
        audio.muted = true
      } else {
        audio.muted = false
        audio.volume = volume / 100
      }
    }
  }, [audio, volume])

  const handleChangeVolume = () => {
    if (volume === 0) {
      return (
        <VolumeNone
          className='player-button'
          onClick={() => setVolume(prevStateVolume)}
        />
      )
    } else if (volume > 30 && volume <= 70) {
      return (
        <VolumeMedium
          className='player-button'
          onClick={handlePrevSaveVolume}
        />
      )
    } else if (volume > 0 && volume <= 50) {
      return (
        <VolumeLow className='player-button' onClick={handlePrevSaveVolume} />
      )
    } else {
      return (
        <VolumeHigh className='player-button' onClick={handlePrevSaveVolume} />
      )
    }
  }

  const handlePrevSaveVolume = () => {
    setVolume(0)
    setPrevStateVolume(volume)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
    localStorage.setItem('volume', e.target.value)
  }

  return (
    <div className={styles.volume}>
      <Tooltip title='Изменить громкость'>{handleChangeVolume()}</Tooltip>
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
        onChange={handleVolumeChange}
      />
    </div>
  )
}

export default VolumeChange
