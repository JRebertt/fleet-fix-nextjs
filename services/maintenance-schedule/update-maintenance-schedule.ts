'use server'

import { MaintenanceSchedule } from '@/@types/maintenance-table'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'

interface MaintenanceResponse {
  maintenance: MaintenanceSchedule
}

export default async function updateMaintenanceSchedule(
  id: string,
  updatedData: Partial<MaintenanceSchedule>,
): Promise<MaintenanceSchedule> {
  const cookieStore = cookies()

  const token = cookieStore.get('@auth_accessToken')
  const res = await api(`/maintenance/${id}/update`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })

  const { maintenance }: MaintenanceResponse = await res.json()

  return maintenance
}
