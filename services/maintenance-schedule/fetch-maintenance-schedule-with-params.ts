import { MaintenanceResponse } from '@/@types/maintenance-table'
import { apiV2 } from '@/lib/api-fetch'

interface fetchMaintenanceScheduleRequest {
  status: string | null
  title: string | null
  vehicle: string | null
  to: string | null
  from: string | null
}

export default async function fetchMaintenanceScheduleWithParams({
  status,
  title,
  vehicle,
  from,
  to,
}: fetchMaintenanceScheduleRequest) {
  console.log(from, to)
  console.log(status)
  const res = await apiV2.get<MaintenanceResponse>(`/maintenances`, {
    params: {
      status,
      title,
      vehicle,
      startDate: from,
      endDate: to,
    },
  })

  return res.data || []
}
