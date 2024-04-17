import { MaintenanceResponse } from '@/@types/maintenance-table'
import { apiV2 } from '@/lib/api-fetch'

export default async function fetchMaintenanceSchedule() {
  const res = await apiV2.get<MaintenanceResponse>(`/maintenances`, {})

  return res.data || []
}
