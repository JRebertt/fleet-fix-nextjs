import { api } from '@/lib/api-fetch'
import { MaintenanceScheduleSchema } from '@/schemas/maintenance-schedule'

import { z } from 'zod'

type MaintenanceScheduleValues = z.infer<typeof MaintenanceScheduleSchema>

export async function getMaintenanceScheduleById(
  id: string,
): Promise<MaintenanceScheduleValues> {
  const res = await api(`/maintenance-schedule/${id}`, {
    method: 'GET',
  })
  const data = await res.json()
  return data
}
