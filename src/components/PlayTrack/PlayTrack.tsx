import { memo, useEffect } from 'react'

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
  const playTrack = usePlayer((state) => state.playTrack)
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
    <div
      className={clsx(className, {
        [styles.controlPanel as string]: isCurrentPath && !isPlaying
      })}>
      {isCurrentPath && isPlaying ? (
        size === 'small' ? (
          <Pause
            className={styles.sizeSmall}
            onClick={() => togglePlay(false)}
          />
        ) : (
          <PauseBig
            className={styles.sizeBig}
            onClick={() => togglePlay(false)}
          />
        )
      ) : size === 'small' ? (
        <Play className={styles.sizeSmall} onClick={() => playTrack(track)} />
      ) : (
        <PlayBig className={styles.sizeBig} onClick={() => playTrack(track)} />
      )}
    </div>
  )
}

export default memo(PlayTrack)
