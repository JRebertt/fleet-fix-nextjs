import { MaintenanceSchedule } from '@/@types/maintenance-table'
import { api } from '@/lib/api-fetch'

interface MaintenanceResponse {
  maintenance: MaintenanceSchedule
}

export default async function startMaintenanceSchedule(
  id: string,
  startDate: Date,
) {
  const res = await api(`/maintenance/${id}/start`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ startDate }),
  })

  const { maintenance }: MaintenanceResponse = await res.json()

  return maintenance
}
