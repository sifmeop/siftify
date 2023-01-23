import FavoriteIcon from 'assets/icons/favorite.svg'
import { type NextPage } from 'next'

interface IProps {
  className: string
}

const Favorite: NextPage<IProps> = ({ className }) => {
  return <FavoriteIcon className={className} />
}

export default Favorite
