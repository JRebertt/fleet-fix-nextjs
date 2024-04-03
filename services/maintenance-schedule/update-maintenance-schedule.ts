import { MaintenanceSchedule } from '@/@types/maintenance-table'
import { api } from '@/lib/api-fetch'

interface MaintenanceResponse {
  maintenance: MaintenanceSchedule
}

export default async function updateMaintenanceSchedule(
  id: string,
  updatedData: Partial<MaintenanceSchedule>,
): Promise<MaintenanceSchedule> {
  const res = await api(`/maintenance/${id}/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })

  const { maintenance }: MaintenanceResponse = await res.json()

  return maintenance
}
