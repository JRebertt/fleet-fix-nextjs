import { MaintenanceSchedule } from '@/@types/maintenance-table'
import { api } from '@/lib/api-fetch'

interface MaintenanceResponse {
  maintenance: MaintenanceSchedule
}

export default async function completeMaintenanceSchedule(
  id: string,
  endDate: Date,
  cost: number | null,
) {
  const res = await api(`/maintenance/${id}/complete`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ endDate, cost }),
  })

  const { maintenance }: MaintenanceResponse = await res.json()

  return maintenance
}
