'use server'

import { cookies } from 'next/headers'
import { api } from '@/lib/api-fetch'
import { redirect } from 'next/navigation'

interface SessionsUserRequest {
  email: string
  password: string
}

export default async function sessionsUser(user: SessionsUserRequest) {
  const cookieStore = cookies()
  const res = await api(`/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  const data = await res.json()

  cookieStore.set('@auth_accessToken', data.token, {
    maxAge: 60 * 60 * 24, // 24 horas em segundos
    httpOnly: true, // Acessível apenas pelo servidor
    sameSite: 'strict', // O cookie é enviado em solicitações apenas do mesmo site
  })

  return data
}
