import { useEffect, useState } from 'react'

import Equalizer from './Equalizer/Equalizer'
import Favorite from './Favorite/Favorite'
import type { NextPage } from 'next'
import Pause from 'assets/icons/pause.svg'
import Play from 'assets/icons/play.svg'
import type { Track } from '@prisma/client'
import clsx from 'clsx'
import styles from './TableMusicItem.module.scss'
import { usePlayer } from '@/stores/usePlayer'

interface IProps {
  track: Track
  index: number
}

const TableMusicItem: NextPage<IProps> = ({ track, index }) => {
  // const globalIsPlaying = usePlayer((state) => state.isPlaying)
  // const setGlobalIsPlaying = usePlayer((state) => state.setIsPlaying)
  // const currentSong = usePlayer((state) => state.currentSong)
  const setCurrentSong = usePlayer((state) => state.setCurrentSong)
  const audioSrc = usePlayer((state) => state.audioSrc)
  const setAudioSrc = usePlayer((state) => state.setAudioSrc)

  // const currentSong = useRef<HTMLAudioElement>()
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [duration, setDuration] = useState<string>('')

  useEffect(() => {
    setCurrentSong(track)
    const getInfo = () => {
      formatDuration(audioSrc?.duration)
    }
    audioSrc?.addEventListener('loadedmetadata', getInfo)
    return () => {
      audioSrc?.removeEventListener('loadedmetadata', getInfo)
    }
  }, [])

  useEffect(() => {
    if (isPlaying) {
      void audioSrc?.play()
    } else {
      void audioSrc?.pause()
    }
  }, [isPlaying])

  const playTrack = () => {
    audioSrc?.pause()
    if (audioSrc?.src !== `${window.location.href}${track.audio}`) {
      setIsPlaying(false)
      setAudioSrc(new Audio(`/${track.audio}`))
      setIsPlaying(true)
    }
    setIsPlaying(true)
  }

  const pauseTrack = () => {
    setIsPlaying(false)
  }

  const formatDuration = (duration: number | undefined) => {
    if (!duration) return
    const minutes = Math.floor((duration % 3600) / 60)
      .toString()
      .padStart(2, '0')
    const seconds = Math.floor(duration % 60)
      .toString()
      .padStart(2, '0')

    setDuration(minutes + ':' + seconds)
  }

  return (
    <div
      style={{ backgroundColor: isPlaying ? 'white' : '' }}
      className={styles.track}>
      <div>
        <div className={clsx(styles.trackIndex, 'text-center')}>
          <span style={{ display: isPlaying ? 'none' : 'block' }}>
            {index + 1}
          </span>
        </div>
        <div className={styles.control}>
          {isPlaying ? (
            <Pause className='mx-auto' onClick={pauseTrack} />
          ) : (
            <Play className='mx-auto' onClick={playTrack} />
          )}
        </div>
        <Equalizer className={styles.equalizer} isPlaying={isPlaying} />
      </div>
      <div>
        <h1>{track.title}</h1>
        <h2 className={styles.featuring}>{track.featuring.join(', ')}</h2>
      </div>
      <Favorite className={styles.favorite} />
      <div className={styles.duration}>{duration}</div>
    </div>
  )
}

export default TableMusicItem
