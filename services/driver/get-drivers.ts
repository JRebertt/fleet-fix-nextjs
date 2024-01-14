import { Driver } from '@/@types/driver-table'
import { env } from '@/env/env-validation'

export default async function getDrivers(): Promise<Driver[]> {
  const res = await fetch(`${env.BASEURL}/api/driver`, {
    cache: 'no-store',
  })

  const data = await res.json()

  return data || []
}
