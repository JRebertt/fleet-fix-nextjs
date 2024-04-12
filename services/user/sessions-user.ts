'use server'

import { api } from '@/lib/api-fetch'

interface SessionsUserRequest {
  email: string
  password: string
}

export default async function sessionsUser(user: SessionsUserRequest) {
  const res = await api(`/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  const data = await res.json()

  return data
}
