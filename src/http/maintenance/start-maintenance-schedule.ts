import { api } from '../api-client'

interface StartScheduleRequest {
  id: string
  scheduledStartDate: Date
}

export async function startSchedule({
  id,
  scheduledStartDate,
}: StartScheduleRequest) {
  const result = await api.put(`maintenance/${id}/start`, {
    json: {
      startDate: scheduledStartDate,
    },
  })
  return result
}
