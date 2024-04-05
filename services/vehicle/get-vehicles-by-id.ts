'use server'

import { Vehicle, VehicleResponse } from '@/@types/vehicle-table'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'

export async function getVehicleById(id: string): Promise<Vehicle> {
  const cookieStore = cookies()

  const token = cookieStore.get('@auth_accessToken')
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
