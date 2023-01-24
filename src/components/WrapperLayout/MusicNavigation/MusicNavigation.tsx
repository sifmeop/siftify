/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Favorite from '@/components/Favorite/Favorite'
import { usePlayer } from '@/stores/usePlayer'
import Empty from 'assets/empty.jpg'
import Add from 'assets/icons/add.svg'
import Pause from 'assets/icons/pause-big.svg'
import Play from 'assets/icons/play-big.svg'
import Random from 'assets/icons/random.svg'
import SkipBack from 'assets/icons/skip-back.svg'
import SkipForward from 'assets/icons/skip-forward.svg'
import { type NextPage } from 'next'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from './MusicNavigation.module.scss'
import ProgressBar from './ProgressBar/ProgressBar'
import RepeatTrack from './RepeatTrack/RepeatTrack'
import Volume from './Volume/Volume'

const MusicNavigation: NextPage = () => {
  const currentSong = usePlayer((state) => state.currentSong)
  const isPlaying = usePlayer((state) => state.isPlaying)
  const setIsPlaying = usePlayer((state) => state.setIsPlaying)
  const audioSrc = usePlayer((state) => state.audioSrc)

  // useEffect(() => {
  // console.log(currentSong)
  // }, [currentSong])

  useEffect(() => {
    if (isPlaying) {
      void audioSrc?.play()
    } else {
      void audioSrc?.pause()
    }
  }, [isPlaying])

  const playTrack = () => {
    // audioSrc?.pause()
    setIsPlaying(true)
  }

  const pauseTrack = () => {
    setIsPlaying(false)
  }

  useEffect(() => {
    if (audioSrc) {
      audioSrc.addEventListener('ended', () => {
        setIsPlaying(false)
      })
    }
  }, [audioSrc])

  return (
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
          {isPlaying ? (
            <Pause onClick={pauseTrack} />
          ) : (
            <Play onClick={playTrack} />
          )}
          <SkipForward />
          <RepeatTrack />
          {/* <Pause /> */}
        </div>
        <div className={styles.volume}>
          <Favorite />
          <Add />
          <Volume />
        </div>
      </div>
    </div>
  )
}

export default MusicNavigation
