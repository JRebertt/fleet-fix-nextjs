import { Vehicle } from '@/@types/vehicle-table'

export async function getVehicleById(id: string): Promise<Vehicle> {
  const res = await fetch(`http://localhost:3000/api/vehicle/${id}`, {
    method: 'GET',
  })
  const data = await res.json()
  return data
}
