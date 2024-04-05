'use server'

import { ProfileUserResponse } from '@/@types/users'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'

export default async function profileUser(): Promise<ProfileUserResponse> {
  const cookieStore = cookies()

  const token = cookieStore.get('@auth_accessToken')

  const res = await api(`/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.value}`,
    },
  })

  const { user }: ProfileUserResponse = await res.json()

  return { user }
}
