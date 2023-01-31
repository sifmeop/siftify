import { api } from '@/utils/api'
import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

interface IProps {
  id?: string
  title: string
  trackId: string
  className?: string
}

const Favorite: NextPage<IProps> = ({ id, title, trackId, className }) => {
  const { data: sessionData } = useSession()
  const userId = String(sessionData?.user?.id)
  const likedSongId = String(id)

  const { refetch: refetchAddToFavorites } =
    api.favorites.addToFavorites.useQuery(
      { trackId, userId },
      { enabled: false }
    )

  const { refetch: refetchDeleteFromFavorites } =
    api.favorites.deleteFromFavorites.useQuery(
      { id: likedSongId },
      { enabled: false }
    )

  const addToFavorites = () => {
    refetchAddToFavorites()
    console.log(`Добавлен трек ${title}`)
  }

  const deleteFromFavorites = () => {
    refetchDeleteFromFavorites()
    console.log(`Удален трек ${title}`)
  }

  return id ? (
    <MdFavorite
      color='#47B5FF'
      size={30}
      className='cursor-pointer'
      onClick={deleteFromFavorites}
    />
  ) : (
    <MdFavoriteBorder
      size={30}
      onClick={addToFavorites}
      className={className}
    />
  )
}

export default Favorite
