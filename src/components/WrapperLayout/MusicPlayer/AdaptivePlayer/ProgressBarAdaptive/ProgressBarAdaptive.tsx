import Duration from '@/components/TrackItem/Duration/Duration'
import { usePlayer } from '@/stores/usePlayer'
import type { NextPage } from 'next'
import ProgressBar from '../../ProgressBar/ProgressBar'
import CurrentTime from './CurrentTime/CurrentTime'

const ProgressBarAdaptive: NextPage = () => {
  const currentTrack = usePlayer((state) => state.currentTrack)
  return (
    currentTrack && (
      <div className='mb-5'>
        <ProgressBar />
        <div className='flex items-center justify-between pt-2'>
          <CurrentTime />
          <Duration track={currentTrack} />
        </div>
      </div>
    )
  )
}

export default ProgressBarAdaptive
