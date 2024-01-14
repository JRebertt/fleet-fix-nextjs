import { Driver } from '@/@types/driver-table'
import { env } from '@/env/env-validation'

export default async function getDrivers(): Promise<Driver[]> {
  const res = await fetch(`http://127.0.0.1:3000/api/driver`, {
    cache: 'no-store',
  })

  const data = await res.json()

  return data || []
}
