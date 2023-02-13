import { memo, useCallback, useEffect } from 'react'

import { usePlayer } from '@/stores/usePlayer'
import type { Track } from '@prisma/client'
import PauseBig from 'assets/icons/pause-big.svg'
import Pause from 'assets/icons/pause.svg'
import PlayBig from 'assets/icons/play-big.svg'
import Play from 'assets/icons/play.svg'
import clsx from 'clsx'
import type { NextPage } from 'next'
import styles from './PlayTrack.module.scss'

interface IProps {
  isCurrentPath: boolean
  className?: string
  track: Track
  size: 'small' | 'big'
}

const PlayTrack: NextPage<IProps> = ({
  isCurrentPath,
  className,
  track,
  size
}) => {
  const audioSrc = usePlayer((state) => state.audioSrc)
  const setAudioSrc = usePlayer((state) => state.setAudioSrc)
  const isPlaying = usePlayer((state) => state.isPlaying)
  const setIsPlaying = usePlayer((state) => state.setIsPlaying)
  const setCurrentSong = usePlayer((state) => state.setCurrentSong)

  useEffect(() => {
    if (isPlaying) {
      void audioSrc?.play()
    } else {
      void audioSrc?.pause()
    }
  }, [audioSrc, isPlaying])

  const playTrack = useCallback(() => {
    audioSrc?.pause()
    if (!isCurrentPath) {
      setIsPlaying(false)
      setCurrentSong(track)
      setAudioSrc(new Audio(`/${track.audio}`))
      setIsPlaying(true)
    }
    setIsPlaying(true)
  }, [
    audioSrc,
    isCurrentPath,
    setIsPlaying,
    setCurrentSong,
    setAudioSrc,
    track
  ])

  const pauseTrack = useCallback(() => {
    setIsPlaying(false)
  }, [setIsPlaying])

  return (
    <div
      className={clsx(className, {
        [styles.controlPanel]: isCurrentPath && !isPlaying
      })}>
      {isCurrentPath && isPlaying ? (
        size === 'small' ? (
          <Pause className='mx-auto' onClick={pauseTrack} />
        ) : (
          <PauseBig className='mx-auto cursor-pointer' onClick={pauseTrack} />
        )
      ) : size === 'small' ? (
        <Play className='mx-auto' onClick={playTrack} />
      ) : (
        <PlayBig className='mx-auto cursor-pointer' onClick={playTrack} />
      )}
    </div>
  )
}

export default memo(PlayTrack)
