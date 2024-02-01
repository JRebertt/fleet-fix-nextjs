import { Vehicle } from '@/@types/vehicle-table'
import { api } from '@/lib/api-fetch'

export default async function getVehicles(): Promise<Vehicle[]> {
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  const res = await api(`/vehicles`, {
    cache: 'no-store',
  })

  const data = await res.json()

  return data || []
}
