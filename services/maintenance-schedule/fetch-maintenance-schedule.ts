import {
  MaintenanceResponse,
  MaintenanceSchedule,
} from '@/@types/maintenance-table'
import { api } from '@/lib/api-fetch'

export default async function fetchMaintenanceSchedule(): Promise<
  MaintenanceSchedule[]
> {
  const res = await api(`/maintenances`, {
    method: 'GET',
    cache: 'no-store',
  })

  const { maintenances }: MaintenanceResponse = await res.json()

  return maintenances || []
}
