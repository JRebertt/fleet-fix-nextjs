import { Driver, FetchDriverResponse } from '@/@types/driver-table'
import { api } from '@/lib/api-fetch'

export default async function fetchDrivers(): Promise<Driver[]> {
  const res = await api(`/drivers`, {
    cache: 'no-store',
  })

  const { drivers }: FetchDriverResponse = await res.json()

  return drivers || []
}
