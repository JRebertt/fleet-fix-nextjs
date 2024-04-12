'use server'

import { Vehicle, VehicleResponse } from '@/@types/vehicle-table'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { COOKIE_NAME } from '@/lib/cookies'

export async function getVehicleById(id: string): Promise<Vehicle> {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/vehicle/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
  })
  const { vehicle }: VehicleResponse = await res.json()

  return vehicle
}
