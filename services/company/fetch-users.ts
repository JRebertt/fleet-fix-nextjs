'use server'

import { Users } from '@/components/driver-form'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { COOKIE_NAME } from '@/lib/cookies'

interface FetchUsersResponse {
  users: Users[]
}

export default async function fetchUsers(): Promise<Users[]> {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/users`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
  })

  const { users }: FetchUsersResponse = await res.json()

  return users || []
}
