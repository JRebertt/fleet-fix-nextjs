'use server'
import { Driver, FetchDriverResponse } from '@/@types/driver-table'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { COOKIE_NAME } from '@/lib/cookies'

export default async function fetchDrivers(): Promise<Driver[]> {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/drivers`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
  })

  const { drivers }: FetchDriverResponse = await res.json()

  return drivers || []
}
