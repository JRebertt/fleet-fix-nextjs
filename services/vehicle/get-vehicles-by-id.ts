import { Vehicle } from '@/@types/vehicle-table'
import { env } from '@/env/env-validation'

export async function getVehicleById(id: string): Promise<Vehicle> {
  const res = await fetch(`http://127.0.0.1:3000/api/vehicle/${id}`, {
    method: 'GET',
  })
  const data = await res.json()
  return data
}
