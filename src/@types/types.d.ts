import { type LucideIcon } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  color?: string
  isChidren?: boolean
  children?: NavItem[]
}

type MaintenanceStatus =
  | 'Scheduled'
  | 'InProgress'
  | 'Completed'
  | 'OnHold'
  | 'Canceled'
  | 'Failed'

interface Vehicle {
  id: string
  make: string
  model: string
  year: string
  licensePlate: string
  vin: string
  driver_id: string
  company_id: string
}

export interface MaintenaceProps {
  maintenance: {
    id: string
    scheduledDate: string
    status: MaintenanceStatus
    title: string
    cost: number
    startDate: string
    endDate: string
    vehicle: Vehicle
  }
}

type PaymentedStatus =
  | 'Pending'
  | 'InProcess'
  | 'Completed'
  | 'OnHold'
  | 'Canceled'
  | 'Failed'

type PaymentMethod = 'Boleto' | 'Transfer' | 'Card' | 'Cash' | 'Pix'

export interface PaymentedProps {
  payment: {
    id: string
    amount: number
    description: string | null
    paymentDate: Date | null
    paymentMethod: PaymentMethod | null
    status: PaymentedStatus
    maintenance_id: string | null
    created_at: Date
    updated_at: Date
    maintenance?: Maintenance
  }
}
