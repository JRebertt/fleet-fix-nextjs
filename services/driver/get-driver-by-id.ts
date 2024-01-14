import { Driver } from '@/@types/driver-table'
import { env } from '@/env/env-validation'

export async function getDriverById(id: string): Promise<Driver> {
  const res = await fetch(`http://127.0.0.1:3000/api/driver/${id}`, {
    method: 'GET',
  })
  const data = await res.json()
  return data
}
