import { Driver } from '@/@types/driver-table'
import { api } from '@/lib/api-fetch'

type DriverWithoutId = Omit<Driver, 'id' | 'created_at' | 'updated_at'>

export default async function createDriver(
  driver: DriverWithoutId,
): Promise<Driver> {
  const res = await api(`/driver`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(driver),
  })

  const data = await res.json()

  return data
}
