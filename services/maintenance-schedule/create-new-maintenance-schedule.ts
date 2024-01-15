import { MaintenanceSchedule } from '@/@types/maintenance.table'
import { api } from '@/lib/api-fetch'

export default async function createNewMaintenanceSchedule(
  maintenanceSchedule: MaintenanceSchedule,
): Promise<MaintenanceSchedule> {
  const res = await api(`/maintenance-schedule`, {
    method: 'POST',

    next: { revalidate: 0 },
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(maintenanceSchedule),
  })

  const data = await res.json()

  return data
}
