/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useCallback, useEffect } from 'react'

import Add from 'assets/icons/add.svg'
import Empty from 'assets/empty.jpg'
import Favorite from '@/components/Favorite/Favorite'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import type { NextPage } from 'next'
import PlayTrack from './PlayTrack/PlayTrack'
import ProgressBar from './ProgressBar/ProgressBar'
import Random from 'assets/icons/random.svg'
import RepeatTrack from './RepeatTrack/RepeatTrack'
import SkipBack from 'assets/icons/skip-back.svg'
import SkipForward from 'assets/icons/skip-forward.svg'
import VolumeChange from './VolumeChange/VolumeChange'
import styles from './MusicNavigation.module.scss'
import { usePlayer } from '@/stores/usePlayer'

const MusicNavigation: NextPage = () => {
  const audioSrc = usePlayer((state) => state.audioSrc)
  const currentSong = usePlayer((state) => state.currentSong)
  const setCurrentSong = usePlayer((state) => state.setCurrentSong)
  const setIsPlaying = usePlayer((state) => state.setIsPlaying)

  useEffect(() => {
    if (audioSrc) {
      audioSrc.addEventListener('ended', () => {
        setIsPlaying(false)
      })
    }
  }, [audioSrc, setIsPlaying])

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
            {currentSong?.image ? (
              <Image
                width={100}
                height={100}
                src={`/${currentSong?.image}`}
                alt={`/${currentSong?.title}`}
              />
            ) : (
              <Image width={100} height={100} src={Empty} alt={'Empty'} />
            )}
            <div>
              <h3 className={styles.title}>{currentSong?.title ?? ''}</h3>
              <p className={styles.featuring}>
                {currentSong?.featuring.join(', ') ?? ''}
              </p>
            </div>
          </div>
          <div className={styles.control}>
            <Random />
            <SkipBack />
            <PlayTrack />
            <SkipForward />
            <RepeatTrack />
          </div>
          <div className={styles.volume}>
            <Favorite title={currentSong.title} trackId={currentSong.id} />
            <Add />
            <VolumeChange />
          </div>
        </div>
        <IoClose onClick={closeNavigation} className={styles.closeNavigation} />
      </div>
    )
  )
}

export default MusicNavigation
