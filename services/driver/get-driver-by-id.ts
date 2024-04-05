'use server'
import { Driver, GetDriverResponse } from '@/@types/driver-table'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'

export async function getDriverById(id: string): Promise<Driver> {
  const cookieStore = cookies()

  const token = cookieStore.get('@auth_accessToken')
  const res = await api(`/driver/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
  })
  const { driver }: GetDriverResponse = await res.json()
  return driver
}
