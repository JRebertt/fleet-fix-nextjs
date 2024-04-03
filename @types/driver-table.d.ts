import { Users } from '@/components/driver-form'

export interface Driver {
  id: string
  cpf: string
  contact_number: string | null
  birthDate: Date | null
  licenseNumber: string | null
  licenseExpiry: Date | null
  user_id: string
  company_id: string
  user?: Users
  created_at: Date
  updated_at: Date
}

export interface GetDriverResponse {
  driver: Driver
}

export interface FetchDriverResponse {
  drivers: Driver[]
}
