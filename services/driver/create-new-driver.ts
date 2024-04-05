'use server'

import { Driver } from '@/@types/driver-table'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'

type DriverWithoutId = Omit<Driver, 'id' | 'created_at' | 'updated_at'>

export default async function createDriver(
  driver: DriverWithoutId,
): Promise<Driver> {
  const cookieStore = cookies()

  const token = cookieStore.get('@auth_accessToken')
  const res = await api(`/driver`, {
    method: 'POST',

    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
    body: JSON.stringify(driver),
  })

  const data = await res.json()

  return data
}
