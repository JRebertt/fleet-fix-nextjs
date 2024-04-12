'use server'

import { api } from '@/lib/api-fetch'

interface SessionsUserRequest {
  email: string
  password: string
}

export default async function refreshToken(user: SessionsUserRequest) {
  try {
    const res = await api(`/token/refresh`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (!res.ok) {
      throw new Error('Failed to refresh token')
    }

    const data = await res.json()
    console.log(data)
    return data
  } catch (error) {
    console.error('An error occurred:', error)
    throw error // Re-throw the error to be handled by the caller
  }
}
