import { api } from '../api-client'

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

type MaintenanceStatus =
  | 'Scheduled'
  | 'InProgress'
  | 'Completed'
  | 'OnHold'
  | 'Canceled'
  | 'Failed'

interface GetRecentMaintenancesResponse {
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

export async function getRecentMaintenances(limit: number) {
  const result = await api
    .get(`maintenances/${limit}/recent`)
    .json<GetRecentMaintenancesResponse>()

  return result
}
