import { MaintenanceSchedule } from '@/@types/maintenance.table'
import { api } from '@/lib/api-fetch'

export default async function getMaintenanceSchedule(): Promise<
  MaintenanceSchedule[]
> {
  const res = await api(`/maintenance-schedule`, {
    method: 'GET',
    cache: 'no-store',
  })

  const data = await res.json()

  return data || []
}
