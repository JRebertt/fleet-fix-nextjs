import { Vehicle } from '@/@types/vehicle-table'
import { api } from '@/lib/api-fetch'

export default async function getVehicles(): Promise<Vehicle[]> {
  const res = await api(`/vehicles`, {
    method: 'GET',
    cache: 'no-store',
  })

  const data = await res.json()

  return data || []
}
