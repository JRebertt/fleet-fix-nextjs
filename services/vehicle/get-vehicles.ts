import { Vehicle } from '@/@types/vehicle-table'

export default async function getVehicles(): Promise<Vehicle[]> {
  const res = await fetch('http://localhost:3000/api/vehicles', {
    cache: 'no-store',
  })
  const data = await res.json()

  return data || []
}
