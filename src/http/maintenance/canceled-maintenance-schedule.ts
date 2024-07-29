import { api } from '../api-client'

interface CanceledScheduleRequest {
  id: string
}

export async function canceledSchedule({ id }: CanceledScheduleRequest) {
  const result = await api.put(`maintenance/${id}/cancel`)

  return result
}
