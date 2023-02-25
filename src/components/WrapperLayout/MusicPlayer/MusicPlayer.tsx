/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useCallback, useEffect, useState } from 'react'

import Favorite from '@/components/Favorite/Favorite'
import { usePlayer } from '@/stores/usePlayer'
import Add from 'assets/icons/add.svg'
import PreviousTrack from 'assets/icons/skip-back.svg'
import NextTrack from 'assets/icons/skip-forward.svg'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { TbArrowsShuffle2 } from 'react-icons/tb'
import AdaptivePlayer from './AdaptivePlayer/AdaptivePlayer'
import styles from './MusicPlayer.module.scss'
import PlayTrack from './PlayTrack/PlayTrack'
import ProgressBar from './ProgressBar/ProgressBar'
import QueueList from './QueueList/QueueList'
import RepeatTrack from './RepeatTrack/RepeatTrack'
import VolumeChange from './VolumeChange/VolumeChange'

const MusicPlayer: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false)

  const audio = usePlayer((state) => state.audio)
  const currentTrack = usePlayer((state) => state.currentTrack)
  const queueList = usePlayer((state) => state.queueList)
  const nextTrack = usePlayer((state) => state.nextTrack)
  const previousTrack = usePlayer((state) => state.previousTrack)
  const togglePlay = usePlayer((state) => state.togglePlay)
  const shuffle = usePlayer((state) => state.shuffle)
  const setShuffle = usePlayer((state) => state.setShuffle)

  const handleNextTrack = useCallback(() => {
    if (audio && queueList.length > 0) {
      nextTrack()
      if (audio.paused) {
        togglePlay(true)
      }
    }
  }, [audio, nextTrack, queueList.length, togglePlay])

  useEffect(() => {
    audio?.addEventListener('ended', () => {
      if (queueList.length === 0) {
        togglePlay(false)
        return
      }
      handleNextTrack()
    })
  }, [audio, handleNextTrack, queueList.length, togglePlay])

  return (
    currentTrack && (
      <div className={styles.navigation}>
        <ProgressBar />
        <div className={styles.controlPanel}>
          <div className={styles.infoArtist}>
            <Image
              width={100}
              height={100}
              src={`/${currentTrack.image}`}
              alt={`/${currentTrack.title}`}
              priority
            />
            <div>
              <h3 className={styles.title}>
                <Link href={`/track/${currentTrack.id}`}>
                  {currentTrack.title}
                </Link>
              </h3>
              <p className={styles.featuring}>
                {currentTrack.featuring.join(', ')}
              </p>
            </div>
          </div>
          <div className={styles.control}>
            <div className={styles.icon}>
              <TbArrowsShuffle2
                size='2.5rem'
                className='player-button'
                onClick={setShuffle}
                color={shuffle ? '#47b5ff' : '#8a8f96'}
              />
            </div>
            <div className={styles.icon}>
              <PreviousTrack
                className='player-button'
                onClick={previousTrack}
              />
            </div>
            <PlayTrack />
            <div className={styles.icon}>
              <NextTrack className='player-button' onClick={handleNextTrack} />
            </div>
            <div className={styles.icon}>
              <RepeatTrack />
            </div>
          </div>
          <div className={styles.volume}>
            <Favorite track={currentTrack} />
            <div className={styles.icon}>
              <Add className={styles.iconStyles} />
            </div>
            <div className={styles.icon}>
              <QueueList />
            </div>
            <div className={styles.icon}>
              <VolumeChange />
            </div>
          </div>
          <div className={styles.adaptivePlayer}>
            <MdOutlineKeyboardArrowUp
              size='2.5rem'
              color='#4A4B52'
              onClick={() => setOpen(true)}
            />
            {open && (
              <AdaptivePlayer
                open={open}
                setOpen={setOpen}
                handleNextTrack={handleNextTrack}
              />
            )}
          </div>
        </div>
      </div>
    )
  )
}

export default MusicPlayer
