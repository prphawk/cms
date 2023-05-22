import { NavItem } from '../components/NavBar/types'
import Paths from '../routes/Paths'

export const navIcon: NavItem[] = [
  {
    id: 'committee',
    icon: 'committee',
    label: 'Comissões',
    href: Paths.COMMITTEE,
  },
  { id: 'members', icon: 'members', label: 'Membros', href: Paths.MEMBERS },
  {
    id: 'configurations',
    icon: 'configurations',
    label: 'Configurações',
    href: Paths.CONFIGURATIONS,
  },
]
