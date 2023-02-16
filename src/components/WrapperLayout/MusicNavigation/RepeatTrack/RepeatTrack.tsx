import { usePlayer } from '@/stores/usePlayer'
import NoRepeat from 'assets/icons/no-repeat.svg'
import Repeat from 'assets/icons/repeat.svg'
import { type NextPage } from 'next'
import { useEffect, useState } from 'react'

const RepeatTrack: NextPage = () => {
  const [isRepeat, setIsRepeat] = useState<boolean>(false)
  const audioSrc = usePlayer((state) => state.audioSrc)

  useEffect(() => {
    if (audioSrc) {
      if (isRepeat) {
        audioSrc.loop = true
      } else {
        audioSrc.loop = false
      }
    }
  }, [audioSrc, isRepeat])

  useEffect(() => {
    setIsRepeat(false)
  }, [audioSrc])

  return (
    <>
      {isRepeat ? (
        <Repeat className='player-button' onClick={() => setIsRepeat(false)} />
      ) : (
        <NoRepeat className='player-button' onClick={() => setIsRepeat(true)} />
      )}
    </>
  )
}

export default RepeatTrack
