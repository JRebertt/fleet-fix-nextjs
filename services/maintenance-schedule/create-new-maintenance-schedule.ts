'use server'

import { MaintenanceSchedule } from '@/@types/maintenance-table'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { COOKIE_NAME } from '@/lib/cookies'

export type MaintenanceScheduleWithoutId = Omit<MaintenanceSchedule, 'id'>

export default async function createNewMaintenanceSchedule(
  maintenanceSchedule: MaintenanceScheduleWithoutId,
): Promise<MaintenanceSchedule> {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/maintenance`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },

    body: JSON.stringify(maintenanceSchedule),
  })

  const data = await res.json()

  return data
}
