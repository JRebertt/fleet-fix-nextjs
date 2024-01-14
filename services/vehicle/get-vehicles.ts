import { Vehicle } from '@/@types/vehicle-table'
import { env } from '@/env/env-validation'

export default async function getVehicles(): Promise<Vehicle[]> {
  const res = await fetch(`${env.BASEURL}:3000/api/vehicles`, {
    cache: 'no-store',
  })
  const data = await res.json()

  return data || []
}
