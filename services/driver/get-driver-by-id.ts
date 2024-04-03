import { Driver, GetDriverResponse } from '@/@types/driver-table'
import { api } from '@/lib/api-fetch'

export async function getDriverById(id: string): Promise<Driver> {
  const res = await api(`/driver/${id}`, {
    method: 'GET',
  })
  const { driver }: GetDriverResponse = await res.json()
  return driver
}
