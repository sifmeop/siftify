import { usePlayer } from '@/stores/usePlayer'
import Pause from 'assets/icons/pause-big.svg'
import Play from 'assets/icons/play-big.svg'
import type { NextPage } from 'next'
import { useEffect } from 'react'

const PlayTrack: NextPage = () => {
  const isPlaying = usePlayer((state) => state.isPlaying)
  const setIsPlaying = usePlayer((state) => state.setIsPlaying)
  const audioSrc = usePlayer((state) => state.audioSrc)

  useEffect(() => {
    if (isPlaying) {
      void audioSrc?.play()
    } else {
      void audioSrc?.pause()
    }
  }, [audioSrc, isPlaying])

  return (
    <>
      {isPlaying ? (
        <Pause className='player-button' onClick={() => setIsPlaying(false)} />
      ) : (
        <Play className='player-button' onClick={() => setIsPlaying(true)} />
      )}
    </>
  )
}

export default PlayTrack
