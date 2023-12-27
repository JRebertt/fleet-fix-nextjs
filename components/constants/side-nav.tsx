import {
  Building2,
  FileSpreadsheet,
  LayoutDashboard,
  Truck,
  User,
} from 'lucide-react'
import { type NavItem } from '@/@types/types'

export const NavItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    title: 'Tabelas',
    icon: FileSpreadsheet,
    href: '/vehicles',
    isChidren: true,
    children: [
      {
        title: 'Empresas',
        icon: Building2,

        href: '/companies',
      },
      {
        title: 'Motoristas',
        icon: User,

        href: '/drivers',
      },
      {
        title: 'Veiculos',
        icon: Truck,

        href: '/vehicles',
      },
    ],
  },
]
