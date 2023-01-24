import { useEffect, useState } from 'react'

import Equalizer from './Equalizer/Equalizer'
import Favorite from '@/components/Favorite/Favorite'
import type { NextPage } from 'next'
import Pause from 'assets/icons/pause.svg'
import Play from 'assets/icons/play.svg'
import type { Track } from '@prisma/client'
import clsx from 'clsx'
import { formatDuration } from '@/utils/formatDuration'
import styles from './TableMusicItem.module.scss'
import { usePlayer } from '@/stores/usePlayer'

interface IProps {
  track: Track
  index: number
}

const TableMusicItem: NextPage<IProps> = ({ track, index }) => {
  const globalIsPlaying = usePlayer((state) => state.isPlaying)
  const setGlobalIsPlaying = usePlayer((state) => state.setIsPlaying)
  const setCurrentSong = usePlayer((state) => state.setCurrentSong)
  const audioSrc = usePlayer((state) => state.audioSrc)
  const setAudioSrc = usePlayer((state) => state.setAudioSrc)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [duration, setDuration] = useState<string | undefined>('')
  const path = audioSrc?.src === `${window.location.href}${track.audio}`

  useEffect(() => {
    const getInfo = () => {
      setDuration(formatDuration(audioSrc?.duration))
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

  useEffect(() => {
    if (path) {
      if (globalIsPlaying) {
        setIsPlaying(true)
      } else {
        setIsPlaying(false)
      }
    }
  }, [globalIsPlaying])

  const playTrack = () => {
    audioSrc?.pause()
    if (!path) {
      setGlobalIsPlaying(false)
      setCurrentSong(track)
      setIsPlaying(false)
      setAudioSrc(new Audio(`/${track.audio}`))
      setIsPlaying(true)
    }
    setIsPlaying(true)
    setGlobalIsPlaying(true)
  }

  const pauseTrack = () => {
    setIsPlaying(false)
    setGlobalIsPlaying(false)
  }

  return (
    <div
      style={{ backgroundColor: path ? 'white' : '' }}
      className={styles.track}>
      <div>
        <div className={clsx(styles.trackIndex, 'text-center')}>
          <span style={{ display: path ? 'none' : 'block' }}>{index + 1}</span>
        </div>
        <div className={styles.control}>
          {path ? (
            <Pause className='mx-auto' onClick={pauseTrack} />
          ) : (
            <Play className='mx-auto' onClick={playTrack} />
          )}
        </div>
        {path && (
          <Equalizer className={styles.equalizer} isPlaying={globalIsPlaying} />
        )}
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
