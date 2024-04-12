'use server'

import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { toast } from 'sonner'
import { COOKIE_NAME } from '@/lib/cookies'

type deleteCompanyByIdResponse = {
  message: string
}

export default async function deleteCompanyById(id: string) {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/company/${id}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
  })

  const { message }: deleteCompanyByIdResponse = await res.json()

  return toast(message)
}
