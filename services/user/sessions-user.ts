'use server'

import { getCookie, getCookies } from 'cookies-next'
import { cookies } from 'next/headers'

import { api } from '@/lib/api-fetch'

interface SessionsUserRequest {
  email: string
  password: string
}

interface ErrorResponse {
  message: string
}

interface SuccessResponse {
  token: string
}

type SessionsUserResponse = ErrorResponse | SuccessResponse

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
