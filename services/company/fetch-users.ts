'use server'

import { Users } from '@/components/driver-form'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'

interface FetchUsersResponse {
  users: Users[]
}

export default async function fetchUsers(): Promise<Users[]> {
  const cookieStore = cookies()

  const token = cookieStore.get('@auth_accessToken')
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
