import Add from 'assets/icons/add.svg'
import type { NextPage } from 'next'
import { useState } from 'react'
import styles from './AddToPlaylist.module.scss'
import AddToPlaylistModal from './AddToPlaylistModal/AddToPlaylistModal'

const AddToPlaylist: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <Add className={styles.add} onClick={() => setOpen(true)} />
      <AddToPlaylistModal open={open} setOpen={setOpen} />
    </>
  )
}

export default AddToPlaylist
