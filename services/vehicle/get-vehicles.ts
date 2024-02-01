import { Vehicle } from '@/@types/vehicle-table'
import { api } from '@/lib/api-fetch'

export default async function getVehicles(): Promise<Vehicle[]> {
  const res = await api(`/vehicles`, {
    method: 'Get',
    cache: 'no-store',
    next: { revalidate: 0 },
  })

  const data = await res.json()

  console.log(data)

  return data || []
}
