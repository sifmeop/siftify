import Favorite from '@/components/Favorite/Favorite'
import PlayTrack from '@/components/PlayTrack/PlayTrack'
import { useIsCurrentTrack } from '@/hooks/useIsCurrentTrack'
import { usePlayer } from '@/stores/usePlayer'
import PreviousTrack from 'assets/icons/skip-back.svg'
import NextTrack from 'assets/icons/skip-forward.svg'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { TbArrowsShuffle2 } from 'react-icons/tb'
import RepeatTrack from '../RepeatTrack/RepeatTrack'
import styles from './AdaptivePlayer.module.scss'
import ProgressBarAdaptive from './ProgressBarAdaptive/ProgressBarAdaptive'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
  handleNextTrack: () => void
}

const AdaptivePlayer: NextPage<IProps> = ({
  open,
  setOpen,
  handleNextTrack
}) => {
  const currentTrack = usePlayer((state) => state.currentTrack)
  const isCurrentPath = useIsCurrentTrack(currentTrack?.title)
  const shuffle = usePlayer((state) => state.shuffle)
  const setShuffle = usePlayer((state) => state.setShuffle)
  const previousTrack = usePlayer((state) => state.previousTrack)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  return (
    <>
      {currentTrack && (
        <div className={styles.player}>
          <div className={styles.closeWrapper}>
            <MdOutlineKeyboardArrowDown
              className={styles.closeIcon}
              size='2.5rem'
              color='#4A4B52'
              onClick={() => setOpen(false)}
            />
          </div>
          <Image
            width={300}
            height={300}
            className={styles.image}
            src={`/${currentTrack.image}`}
            alt={currentTrack.title}
            blurDataURL={`/${currentTrack.image}`}
            placeholder='blur'
          />
          <div className='mb-5 flex justify-between'>
            <div>
              <h1 className={styles.title}>{currentTrack.title}</h1>
              <p className={styles.featuring}>
                {currentTrack.featuring.join(', ')}
              </p>
            </div>
            <Favorite track={currentTrack} />
          </div>
          <ProgressBarAdaptive />
          <div className='flex items-center justify-center gap-5'>
            <TbArrowsShuffle2
              size='2.5rem'
              className='player-button'
              onClick={setShuffle}
              color={shuffle ? '#47b5ff' : '#8a8f96'}
            />
            <PreviousTrack className='player-button' onClick={previousTrack} />
            <PlayTrack
              track={currentTrack}
              size='big'
              isCurrentPath={isCurrentPath}
            />
            <NextTrack className='player-button' onClick={handleNextTrack} />
            <RepeatTrack />
          </div>
          {/* <div> */}
          {/* <QueueList /> */}
          {/* <VolumeChange /> */}
          {/* </div> */}
        </div>
      )}
    </>
  )
}

export default AdaptivePlayer
