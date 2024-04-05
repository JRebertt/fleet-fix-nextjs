'use server'

import { Vehicle } from '@/@types/vehicle-table'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'

export interface VehiclesResponse {
  vehicles: Vehicle[]
}

export default async function getVehicles(): Promise<Vehicle[]> {
  const cookieStore = cookies()

  const token = cookieStore.get('@auth_accessToken')
  const res = await api(`/vehicles`, {
    method: 'Get',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
  })

  const { vehicles }: VehiclesResponse = await res.json()

  return vehicles || []
}
