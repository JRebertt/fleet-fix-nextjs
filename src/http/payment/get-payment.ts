import { api } from '../api-client'

type PaymentedStatus =
  | 'Pending'
  | 'InProcess'
  | 'Completed'
  | 'OnHold'
  | 'Canceled'
  | 'Failed'

type PaymentMethod = 'Boleto' | 'Transfer' | 'Card' | 'Cash' | 'Pix'

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

interface GetMaintenanceScheduleResponse {
  maintenances: {
    id: string
    scheduledDate: string
    status: MaintenanceStatus
    title: string
    cost: number
    startDate: string
    endDate: string
    vehicle: Vehicle
  }[]
}

export default async function getMaintenanceSchedule() {
  const result = await api
    .get('maintenances')
    .json<GetMaintenanceScheduleResponse>()

  return result
}