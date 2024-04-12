'use server'

import { MaintenanceSchedule } from '@/@types/maintenance-table'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { COOKIE_NAME } from '@/lib/cookies'

interface MaintenanceRequest {
  id: string
  startDate: Date
}

interface MaintenanceResponse {
  maintenance: MaintenanceSchedule
}

export default async function startMaintenanceSchedule({
  id,
  startDate,
}: MaintenanceRequest) {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/maintenance/${id}/start`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token?.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ startDate }),
  })

  const { maintenance }: MaintenanceResponse = await res.json()

  return maintenance
}
