import { Vehicle } from '@/@types/vehicle-table'
import { api } from '@/lib/api-fetch'

export async function getVehicleById(id: string): Promise<Vehicle> {
  const res = await api(`/vehicle/${id}`, {
    method: 'GET',
  })
  const data = await res.json()
  return data
}
