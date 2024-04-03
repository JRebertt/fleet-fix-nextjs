import { MaintenanceSchedule } from '@/@types/maintenance-table'
import { api } from '@/lib/api-fetch'

type GetMaintenanceScheduleByIdResponse = {
  maintenance: MaintenanceSchedule
}

export async function getMaintenanceScheduleById(
  id: string,
): Promise<MaintenanceSchedule> {
  const res = await api(`/maintenance/${id}`, {
    method: 'GET',
  })
  const { maintenance }: GetMaintenanceScheduleByIdResponse = await res.json()
  return maintenance
}
