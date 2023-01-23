/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { usePlayer } from '@/stores/usePlayer'
import Add from 'assets/icons/add.svg'
import Favorite from 'assets/icons/favorite.svg'
import Play from 'assets/icons/play-big.svg'
// import Pause from 'assets/icons/pause-big.svg'
import Random from 'assets/icons/random.svg'
import Repeat from 'assets/icons/repeat.svg'
import SkipBack from 'assets/icons/skip-back.svg'
import SkipForward from 'assets/icons/skip-forward.svg'
import { type NextPage } from 'next'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from './MusicNavigation.module.scss'
import Volume from './Volume/Volume'

const MusicNavigation: NextPage = () => {
  const currentSong = usePlayer((state) => state.currentSong)

  useEffect(() => {
    console.log(currentSong)
  }, [currentSong])

  return (
    <div className={styles.navigation}>
      <div className={styles.progress}>
        <div className={styles.progressCompleted} />
      </div>
      <div className={styles.controlPanel}>
        <div className={styles.infoArtist}>
          <Image
            width={100}
            height={100}
            src={`/${currentSong?.image}`}
            alt={`/${currentSong?.title}`}
          />
          <div>
            <h3 className={styles.title}>{currentSong?.title}</h3>
            <p className={styles.featuring}>
              {currentSong?.featuring.join(', ')}
            </p>
          </div>
        </div>
        <div className={styles.control}>
          <Random />
          <SkipBack />
          <Play />
          <SkipForward />
          <Repeat />
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
