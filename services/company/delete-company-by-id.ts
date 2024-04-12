'use server'

import { api } from '@/lib/api-fetch'
import { COOKIE_NAME } from '@/lib/cookies'
import { cookies } from 'next/headers'

export async function deleteCompanyById(id: string) {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/company/${id}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error()
  }
}
