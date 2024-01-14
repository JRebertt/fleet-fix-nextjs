import { Driver } from '@/@types/driver-table'
import { env } from '@/env/env-validation'

export async function getDriverById(id: string): Promise<Driver> {
  const res = await fetch(`${env.BASEURL}/api/driver/${id}`, {
    method: 'GET',
  })
  const data = await res.json()
  return data
}
