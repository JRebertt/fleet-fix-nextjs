import { api } from '../api-client'
interface DeleteMaintenanceScheduleRequest {
  id: string
}

export async function deleteMaintenanceSchedule({
  id,
}: DeleteMaintenanceScheduleRequest) {
  const result = await api.delete(`maintenance/${id}/delete`)

  return result
}
