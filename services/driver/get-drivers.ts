import { Driver } from '@/@types/driver-table'
import { api } from '@/lib/api-fetch'

export default async function getDrivers(): Promise<Driver[]> {
  const res = await api(`/driver`, {
    cache: 'no-store',
  })

  const data = await res.json()

  return data || []
}
