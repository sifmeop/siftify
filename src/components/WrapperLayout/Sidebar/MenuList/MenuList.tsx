import { type NextPage } from 'next'
import MenuItem from './MenuItem/MenuItem'
import { menuLinks } from './menuLinks'

const MenuList: NextPage = () => {
  return (
    <ul>
      {menuLinks.map((link) => (
        <MenuItem key={link.name} item={link} />
      ))}
    </ul>
  )
}

export default MenuList
