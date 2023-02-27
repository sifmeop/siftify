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
import AddToPlaylist from '../AddToPlaylist/AddToPlaylist'
import QueueList from '../QueueList/QueueList'
import RepeatTrack from '../RepeatTrack/RepeatTrack'
import VolumeChange from '../VolumeChange/VolumeChange'
import styles from './MobilePlayer.module.scss'
import ProgressBarMobile from './ProgressBarMobile/ProgressBarMobile'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
  handleNextTrack: () => void
}

const MobilePlayer: NextPage<IProps> = ({ open, setOpen, handleNextTrack }) => {
  const currentTrack = usePlayer((state) => state.currentTrack)
  const isCurrentPath = useIsCurrentTrack(currentTrack?.title)
  const shuffle = usePlayer((state) => state.shuffle)
  const setShuffle = usePlayer((state) => state.setShuffle)
  const previousTrack = usePlayer((state) => state.previousTrack)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  return (
    <>
      {currentTrack && (
        <div className={styles.player}>
          <div className={styles.inner}>
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
            <div className='mb-5 flex justify-between gap-3'>
              <div>
                <h1 className={styles.title}>{currentTrack.title}</h1>
                <p className={styles.featuring}>
                  {currentTrack.featuring.join(', ')}
                </p>
              </div>
              <Favorite track={currentTrack} />
            </div>
            <ProgressBarMobile />
            <div className='mb-5 flex items-center justify-center gap-5'>
              <TbArrowsShuffle2
                size='2.5rem'
                className='player-button'
                onClick={setShuffle}
                color={shuffle ? '#47b5ff' : '#8a8f96'}
              />
              <PreviousTrack
                className='player-button'
                onClick={previousTrack}
              />
              <PlayTrack
                track={currentTrack}
                size='big'
                isCurrentPath={isCurrentPath}
              />
              <NextTrack className='player-button' onClick={handleNextTrack} />
              <RepeatTrack />
            </div>
            <div className='flex items-center justify-between gap-2'>
              <VolumeChange />
              <div className='flex items-center gap-2'>
                <AddToPlaylist />
                <QueueList />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MobilePlayer
