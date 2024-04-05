'use server'

import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { toast } from 'sonner'

type deleteDriverByIdResponse = {
  messege: string
}

export async function deleteDriverById(id: string) {
  const cookieStore = cookies()

  const token = cookieStore.get('@auth_accessToken')
  const res = await api(`/driver/${id}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
  })

  const { messege }: deleteDriverByIdResponse = await res.json()

  return toast(messege)
}
