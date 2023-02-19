import { usePlayer } from '@/stores/usePlayer'
import Pause from 'assets/icons/pause-big.svg'
import Play from 'assets/icons/play-big.svg'
import type { NextPage } from 'next'
import { useEffect } from 'react'

const PlayTrack: NextPage = () => {
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
    <>
      {isPlaying ? (
        <Pause className='player-button' onClick={() => togglePlay(false)} />
      ) : (
        <Play className='player-button' onClick={() => togglePlay(true)} />
      )}
    </>
  )
}

export default PlayTrack
