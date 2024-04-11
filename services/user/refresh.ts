'use server'
import { api } from '@/lib/api-fetch'
import { getCookies } from 'cookies-next'
import { cookies } from 'next/headers'

interface SessionsUserRequest {
  email: string
  password: string
}

export default async function refreshToken(user: SessionsUserRequest) {
  const res = await api(`/token/refresh`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  const data = await res.json()

  console.log(data)

  return data
}
