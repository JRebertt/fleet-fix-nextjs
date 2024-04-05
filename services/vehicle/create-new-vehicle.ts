'use server'

import { Vehicle } from '@/@types/vehicle-table'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'

type VehicleWithoutId = Omit<Vehicle, 'id'>

export default async function createNewVehicle(
  vehicle: VehicleWithoutId,
): Promise<Vehicle> {
  const cookieStore = cookies()

  const token = cookieStore.get('@auth_accessToken')
  const res = await api(`/vehicle`, {
    method: 'POST',

    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  })

  const data = await res.json()

  return data
}
