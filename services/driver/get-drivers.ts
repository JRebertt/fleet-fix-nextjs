import { Driver } from '@/@types/driver-table'

export default async function getDrivers(): Promise<Driver[]> {
  const res = await fetch('http://localhost:3000/api/driver', {
    method: 'GET',
    next: { revalidate: 1800 },
  })

  const data = await res.json()

  return data || []
}
