import { api } from '../api-client'

type MaintenanceStatus =
  | 'Scheduled'
  | 'InProgress'
  | 'Completed'
  | 'OnHold'
  | 'Canceled'
  | 'Failed'

interface CreateScheduleRequest {
  title: string
  scheduledDate: Date
  description: string | null
  status: MaintenanceStatus
  startDate?: Date | null
  endDate?: Date | null
  cost?: number | null
  vehicleId: string
}

type CreateScheduleResponse = void

export async function createSchedule({
  title,
  scheduledDate,
  description,
  status,
  startDate,
  endDate,
  cost,
  vehicleId,
}: CreateScheduleRequest): Promise<CreateScheduleResponse> {
  await api.post('maintenance', {
    json: {
      title,
      scheduledDate,
      description,
      status,
      startDate,
      endDate,
      cost,
      vehicle_id: vehicleId,
    },
  })
}
