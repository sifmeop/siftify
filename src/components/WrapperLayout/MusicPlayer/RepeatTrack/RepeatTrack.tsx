import { usePlayer } from '@/stores/usePlayer'
import { type NextPage } from 'next'
import { useEffect, useState } from 'react'
import { TbRepeat, TbRepeatOnce } from 'react-icons/tb'

const RepeatTrack: NextPage = () => {
  const [isRepeat, setIsRepeat] = useState<boolean>(false)
  const audio = usePlayer((state) => state.audio)

  useEffect(() => {
    if (audio) {
      if (isRepeat) {
        audio.loop = true
      } else {
        audio.loop = false
      }
    }
  }, [audio, isRepeat])

  useEffect(() => {
    setIsRepeat(false)
  }, [audio])

  return (
    <>
      {isRepeat ? (
        <TbRepeatOnce
          size='2.4rem'
          className='player-button'
          onClick={() => setIsRepeat(false)}
          color='#47b5ff'
        />
      ) : (
        <TbRepeat
          size='2.4rem'
          className='player-button'
          onClick={() => setIsRepeat(true)}
          color='#8a8f96'
        />
      )}
    </>
  )
}

export default RepeatTrack
