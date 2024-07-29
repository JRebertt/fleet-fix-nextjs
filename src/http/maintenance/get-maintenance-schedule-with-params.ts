import { api } from '../api-client'

interface GetMaintenanceScheduleRequest {
  page: number
  status?: string | null
  title?: string | null
  to?: string | null
  from?: string | null
  vehicle?: string | null
}

type MaintenanceStatus =
  | 'Scheduled'
  | 'InProgress'
  | 'Completed'
  | 'OnHold'
  | 'Canceled'
  | 'Failed'

interface Vehicle {
  id: string
  make: string
  model: string
  year: string
  licensePlate: string
  vin: string
  driver_id: string
  company_id: string
}

interface GetMaintenanceScheduleResponse {
  maintenances: {
    id: string
    scheduledDate: string
    status: MaintenanceStatus
    title: string
    cost: number
    startDate: string
    endDate: string
    vehicle: Vehicle
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getMaintenanceScheduleWithParams({
  title,
  status,
  page,
  vehicle,
}: GetMaintenanceScheduleRequest) {
  const params: Record<string, string | number> = {
    page,
    ...(title && { title }),
    ...(vehicle && { vehicle }),
    ...(status && status !== 'All' && { status }),
  }

  const result = await api
    .get('maintenances', {
      next: {
        tags: ['maintenances'],
      },
      searchParams: params,
    })
    .json<GetMaintenanceScheduleResponse>()

  return result
}
