'use server'

import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { toast } from 'sonner'
import { COOKIE_NAME } from '@/lib/cookies'

type deleteDriverByIdResponse = {
  messege: string
}

export async function deleteDriverById(id: string) {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
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
