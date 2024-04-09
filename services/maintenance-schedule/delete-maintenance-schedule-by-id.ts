'use server'

import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'

type deleteMaintenaceByIdResponse = {
  message: string
}

export default async function deleteMaintenanceScheduleById(id: string) {
  const cookieStore = cookies()

  const token = cookieStore.get('@auth_accessToken')
  const res = await api(`/maintenance/${id}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
  })

  const { message }: deleteMaintenaceByIdResponse = await res.json()

  return message
}
