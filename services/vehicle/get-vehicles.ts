import { Vehicle } from '@/@types/vehicle-table'

export default async function getVehicles(): Promise<Vehicle[]> {
  const res = await fetch('http://127.0.0.1:3000/api/vehicles', {
    method: 'GET',
    next: { revalidate: 1 },
  })
  const data = await res.json()

  return data || []
}
