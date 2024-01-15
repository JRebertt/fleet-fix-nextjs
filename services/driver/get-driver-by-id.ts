import { Driver } from '@/@types/driver-table'
import { api } from '@/lib/api-fetch'

export async function getDriverById(id: string): Promise<Driver> {
  const res = await api(`/driver/${id}`, {
    method: 'GET',
  })
  const data = await res.json()
  return data
}
