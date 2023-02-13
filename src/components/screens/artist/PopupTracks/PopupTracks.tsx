import type { Artist, Track } from '@prisma/client'

import Popup from '@/components/ui/Popup/Popup'
import type { NextPage } from 'next'
import PopupTracksItem from './PopupTracksItem/PopupTracksItem'

interface IProps {
  onClose: (value: boolean) => void
  tracks: (Track & { artist: Artist })[] | undefined
  artist: string
}

const PopupTracks: NextPage<IProps> = ({ onClose, tracks, artist }) => {
  return (
    <Popup onClose={onClose}>
      <>
        <div className='tet-3xl mb-5 rounded-lg bg-primary p-5 text-center font-bold text-white'>
          {artist}
        </div>
        {tracks &&
          tracks.map((track, index) => (
            <PopupTracksItem key={track.id} track={track} index={index} />
          ))}
      </>
    </Popup>
  )
}

export default PopupTracks
