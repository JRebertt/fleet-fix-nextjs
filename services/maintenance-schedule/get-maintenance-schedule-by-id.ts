'use server'

import { MaintenanceSchedule } from '@/@types/maintenance-table'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'

type GetMaintenanceScheduleByIdResponse = {
  maintenance: MaintenanceSchedule
}

export async function getMaintenanceScheduleById(
  id: string,
): Promise<MaintenanceSchedule> {
  const cookieStore = cookies()

  const token = cookieStore.get('@auth_accessToken')
  const res = await api(`/maintenance/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
  })
  const { maintenance }: GetMaintenanceScheduleByIdResponse = await res.json()
  return maintenance
}
