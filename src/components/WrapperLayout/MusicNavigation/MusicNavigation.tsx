/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useCallback, useEffect } from 'react'

import Favorite from '@/components/Favorite/Favorite'
import { usePlayer } from '@/stores/usePlayer'
import { useQueue } from '@/stores/useQueue'
import Add from 'assets/icons/add.svg'
import Random from 'assets/icons/random.svg'
import PreviousTrack from 'assets/icons/skip-back.svg'
import NextTrack from 'assets/icons/skip-forward.svg'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { IoClose } from 'react-icons/io5'
import styles from './MusicNavigation.module.scss'
import PlayTrack from './PlayTrack/PlayTrack'
import ProgressBar from './ProgressBar/ProgressBar'
import QueueList from './QueueList/QueueList'
import RepeatTrack from './RepeatTrack/RepeatTrack'
import VolumeChange from './VolumeChange/VolumeChange'

const MusicNavigation: NextPage = () => {
  const audioSrc = usePlayer((state) => state.audioSrc)
  const currentSong = usePlayer((state) => state.currentSong)
  const setCurrentSong = usePlayer((state) => state.setCurrentSong)
  const setIsPlaying = usePlayer((state) => state.setIsPlaying)
  const queueList = useQueue((state) => state.queueList)
  const nextTrack = useQueue((state) => state.nextTrack)
  const previousTrack = useQueue((state) => state.previousTrack)

  const handleNextTrack = useCallback(() => {
    if (audioSrc && queueList.length > 0) {
      nextTrack()
      if (audioSrc.paused) {
        setIsPlaying(true)
      }
    }
  }, [audioSrc, queueList])

  const handlePreviousTrack = useCallback(() => {
    previousTrack()
  }, [])

  useEffect(() => {
    audioSrc?.addEventListener('ended', () => {
      if (queueList.length === 0) {
        setIsPlaying(false)
        return
      }
      handleNextTrack()
    })
  }, [audioSrc, handleNextTrack])

  const closeNavigation = useCallback(() => {
    setIsPlaying(false)
    setCurrentSong(null)
  }, [setCurrentSong, setIsPlaying])

  return (
    currentSong && (
      <div className={styles.navigation}>
        <ProgressBar />
        <div className={styles.controlPanel}>
          <div className={styles.infoArtist}>
            <Image
              width={100}
              height={100}
              src={`/${currentSong.image}`}
              alt={`/${currentSong.title}`}
              priority
            />
            <div>
              <h3 className={styles.title}>
                <Link href={`/track/${currentSong.id}`}>
                  {currentSong.title}
                </Link>
              </h3>
              <p className={styles.featuring}>
                {currentSong.featuring.join(', ')}
              </p>
            </div>
          </div>
          <div className={styles.control}>
            <Random className='player-button' />
            <PreviousTrack
              className='player-button'
              onClick={handlePreviousTrack}
            />
            <PlayTrack />
            <NextTrack className='player-button' onClick={handleNextTrack} />
            <RepeatTrack />
          </div>
          <div className={styles.volume}>
            <Favorite track={currentSong} />
            <Add className={styles.iconStyles} />
            <QueueList />
            <VolumeChange />
          </div>
        </div>
        <IoClose onClick={closeNavigation} className={styles.closeNavigation} />
      </div>
    )
  )
}

export default MusicNavigation
