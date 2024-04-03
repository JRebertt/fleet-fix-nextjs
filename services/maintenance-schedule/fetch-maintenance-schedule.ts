import {
  GetMaintenanceSchedule,
  MaintenanceResponse,
} from '@/@types/maintenance-table'
import { api } from '@/lib/api-fetch'

export default async function fetchMaintenanceSchedule(): Promise<
  GetMaintenanceSchedule[]
> {
  const res = await api(`/maintenances`, {
    method: 'GET',
    cache: 'no-store',
  })

  const { maintenances }: MaintenanceResponse = await res.json()

  return maintenances || []
}
