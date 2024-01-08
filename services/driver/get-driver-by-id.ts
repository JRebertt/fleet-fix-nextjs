import { Driver } from '@/@types/driver-table'

export async function getDriverById(id: string): Promise<Driver> {
  const res = await fetch(`http://localhost:3000/api/driver/${id}`, {
    method: 'GET',
  })
  const data = await res.json()
  return data
}
