import { Vehicle } from '@/@types/vehicle-table'
import { api } from '@/lib/api-fetch'

type VehicleWithoutId = Omit<Vehicle, 'id'>

export default async function createNewVehicle(
  vehicle: VehicleWithoutId,
): Promise<Vehicle> {
  const res = await api(`/vehicle`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  })

  const data = await res.json()

  return data
}
