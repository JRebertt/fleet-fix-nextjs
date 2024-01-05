import { Vehicle } from '@/@types/vehicle-table'
import { revalidatePath } from 'next/cache'

export default async function getVehicles(): Promise<Vehicle[]> {
  const res = await fetch('http://localhost:3000/api/vehicles', {
    method: 'GET',
    next: { revalidate: 1 },
  })
  revalidatePath('/')
  const data = await res.json()

  return data || []
}
