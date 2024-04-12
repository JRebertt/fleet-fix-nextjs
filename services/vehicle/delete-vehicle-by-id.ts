'use server'

import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { toast } from 'sonner'
import { COOKIE_NAME } from '@/lib/cookies'

type deleteVehicleByIdResponse = {
  message: string
}

export default async function deleteVehicleById(id: string) {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/vehicle/${id}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
  })

  const { message }: deleteVehicleByIdResponse = await res.json()

  return toast(message)
}
