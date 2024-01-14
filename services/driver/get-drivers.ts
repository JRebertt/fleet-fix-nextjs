import { Driver } from '@/@types/driver-table'

export default async function getDrivers(): Promise<Driver[]> {
  const res = await fetch('http://localhost:3000/api/driver', {
    cache: 'no-store',
  })

  const data = await res.json()

  return data || []
}
