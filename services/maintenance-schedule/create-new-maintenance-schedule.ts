import { MaintenanceSchedule } from '@/@types/maintenance-table'
import { api } from '@/lib/api-fetch'

export type MaintenanceScheduleWithoutId = Omit<MaintenanceSchedule, 'id'>

export default async function createNewMaintenanceSchedule(
  maintenanceSchedule: MaintenanceScheduleWithoutId,
): Promise<MaintenanceSchedule> {
  const res = await api(`/maintenance`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(maintenanceSchedule),
  })

  const data = await res.json()

  return data
}
