'use server'

import { MaintenanceSchedule } from '@/@types/maintenance-table'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'

interface MaintenanceResponse {
  maintenance: MaintenanceSchedule
}

export default async function startMaintenanceSchedule(
  id: string,
  startDate: Date,
) {
  const cookieStore = cookies()

  const token = cookieStore.get('@auth_accessToken')
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