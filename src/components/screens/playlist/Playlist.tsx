import type { CreatePlaylist } from '@prisma/client'
import { type NextPage } from 'next'

interface IProps {
  playlist: CreatePlaylist
}

const Playlist: NextPage<IProps> = ({ playlist }) => {
  return <div>{playlist.name}</div>
}

export default Playlist
