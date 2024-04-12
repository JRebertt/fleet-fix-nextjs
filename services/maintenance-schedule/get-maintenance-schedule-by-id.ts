'use server'

import { MaintenanceSchedule } from '@/@types/maintenance-table'
import { api } from '@/lib/api-fetch'
import { COOKIE_NAME } from '@/lib/cookies'
import { cookies } from 'next/headers'

type GetMaintenanceScheduleByIdResponse = {
  maintenance: MaintenanceSchedule
}

export async function getMaintenanceScheduleById(
  id: string,
): Promise<MaintenanceSchedule> {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/maintenance/${id}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
  })
  const { maintenance }: GetMaintenanceScheduleByIdResponse = await res.json()
  return maintenance
}
