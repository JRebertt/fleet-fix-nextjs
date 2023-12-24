import { Vehicle } from '@/@types/tables'

export default async function getVehicles(): Promise<Vehicle[]> {
  const res = await fetch('http://localhost:3000/api/vehicles', {
    method: 'GET',
    next: { revalidate: 1800 },
  })
  const data = await res.json()

  return data || []
}
