import ModalPlaylist from '@/components/ModalPlaylist/ModalPlaylist'
import { usePlayer } from '@/stores/usePlayer'
import { usePlaylistStore } from '@/stores/usePlaylistStore'
import Add from 'assets/icons/add.svg'
import type { NextPage } from 'next'
import styles from './AddToPlaylist.module.scss'

const AddToPlaylist: NextPage = () => {
  const currentTrack = usePlayer((state) => state.currentTrack)
  const setOpen = usePlaylistStore((state) => state.setOpen)

  return (
    <>
      <Add className={styles.add} onClick={setOpen} />
      <ModalPlaylist trackId={currentTrack?.id} title={currentTrack?.title} />
    </>
  )
}

export default AddToPlaylist
