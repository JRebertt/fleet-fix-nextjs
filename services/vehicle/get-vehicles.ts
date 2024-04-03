import { Vehicle } from '@/@types/vehicle-table'
import { api } from '@/lib/api-fetch'

export interface VehiclesResponse {
  vehicles: Vehicle[]
}

export default async function getVehicles(): Promise<Vehicle[]> {
  const res = await api(`/vehicles`, {
    method: 'Get',
    cache: 'no-store',
  })

  const { vehicles }: VehiclesResponse = await res.json()

  return vehicles || []
}
