import type { NextPage } from 'next'
import Pause from 'assets/icons/pause-big.svg'
import Play from 'assets/icons/play-big.svg'
import { useEffect } from 'react'
import { usePlayer } from '@/stores/usePlayer'

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
  }, [isPlaying])

  return (
    <>
      {isPlaying ? (
        <Pause onClick={() => setIsPlaying(false)} />
      ) : (
        <Play onClick={() => setIsPlaying(true)} />
      )}
    </>
  )
}

export default PlayTrack
