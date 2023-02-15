import type { Artist, Track } from '@prisma/client'

import { Modal } from 'antd'
import type { NextPage } from 'next'
import PopupTracksItem from './PopupTracksItem/PopupTracksItem'

interface IProps {
  state: boolean
  setState: (value: boolean) => void
  artist: string
  tracks: (Track & { artist: Artist })[] | undefined
}

const PopupTracks: NextPage<IProps> = ({ state, setState, artist, tracks }) => {
  const handleOk = () => {
    setState(false)
  }
  return (
    <Modal
      title={<h2 className='text-xl font-bold'>Синглы артиста {artist}</h2>}
      open={state}
      onOk={handleOk}
      onCancel={() => setState(false)}
      width={800}
      footer={null}>
      <>
        <div className='mb-5 rounded-lg bg-primary p-5 text-center text-white'>
          {artist}
        </div>
        {tracks &&
          tracks.map((track, index) => (
            <PopupTracksItem key={track.id} track={track} index={index} />
          ))}
      </>
    </Modal>
  )
}

export default PopupTracks
