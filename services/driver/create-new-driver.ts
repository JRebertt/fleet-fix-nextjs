import { Driver } from '@/@types/driver-table'
import { env } from '@/env/env-validation'

export default async function createNewDriver(driver: Driver): Promise<Driver> {
  const res = await fetch(`${env.BASEURL}:3000/api/driver`, {
    method: 'POST',

    next: { revalidate: 0 },
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(driver),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Erro desconhecido ao adicionar item')
  }

  return data
}
