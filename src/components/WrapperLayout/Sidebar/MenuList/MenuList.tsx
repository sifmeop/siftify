import { type NextPage } from 'next'
import Separator from '../Separator/Separator'
import MenuItem from './MenuItem/MenuItem'
import { menuLinks } from './menuLinks'

const MenuList: NextPage = () => {
  return (
    <>
      <Separator title='Меню' />
      <ul>
        {menuLinks.map((link) => (
          <MenuItem key={link.name} item={link} />
        ))}
      </ul>
    </>
  )
}

export default MenuList
