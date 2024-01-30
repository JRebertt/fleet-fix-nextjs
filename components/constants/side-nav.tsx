import {
  Building2,
  FileSpreadsheet,
  LayoutDashboard,
  Truck,
  User,
  Wallet,
  Wrench,
  HardHat,
} from 'lucide-react'
import { type NavItem } from '@/@types/types'

export const NavItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    title: 'Pagamentos',
    icon: Wallet,
    href: '/payment',
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
      {
        title: 'Oficinas',
        icon: Wrench,

        href: '/workshop',
      },
      {
        title: 'Autopeças',
        icon: HardHat,

        href: '/partstores',
      },
    ],
  },
]
