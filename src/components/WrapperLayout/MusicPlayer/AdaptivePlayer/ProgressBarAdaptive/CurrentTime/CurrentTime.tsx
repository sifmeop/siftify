import { useEffect, useState } from 'react'

import { usePlayer } from '@/stores/usePlayer'
import { formatDuration } from '@/utils/formatDuration'
import type { NextPage } from 'next'

const CurrentTime: NextPage = () => {
  const audio = usePlayer((state) => state.audio)
  const [currentTime, setCurrentTime] = useState(audio?.currentTime)

  useEffect(() => {
    const handleCurrentTime = () => {
      setCurrentTime(audio?.currentTime)
    }
    audio?.addEventListener('timeupdate', () => handleCurrentTime)
    return () => audio?.addEventListener('timeupdate', handleCurrentTime)
  }, [audio])

  return (
    <div className='text-center text-sm text-primary'>
      {formatDuration(currentTime, 'short')}
    </div>
  )
}

export default CurrentTime
