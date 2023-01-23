import { type IPlaylistLink } from '@/types/playlistLink.type'
import { type NextPage } from 'next'
import PlaylistItem from './PlaylistItem/PlaylistItem'

interface IProps {
  list: IPlaylistLink[]
}

const PlaylistList: NextPage<IProps> = ({ list }) => {
  return (
    <ul>
      {list.map((link) => (
        <PlaylistItem key={link.name} item={link} />
      ))}
    </ul>
  )
}

export default PlaylistList
