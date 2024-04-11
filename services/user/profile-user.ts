'use server'

import { ProfileUserResponse } from '@/@types/users'
import { api } from '@/lib/api-fetch'

export default async function profileUser(
  token: string,
): Promise<ProfileUserResponse> {
  const res = await api(`/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const { user }: ProfileUserResponse = await res.json()

  return { user }
}
