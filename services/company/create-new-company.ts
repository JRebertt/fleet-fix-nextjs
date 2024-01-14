import { Company } from '@/@types/company-table'
import { env } from '@/env/env-validation'

export default async function createNewComapny(
  company: Company,
): Promise<Company> {
  const res = await fetch(`${env.BASEURL}/api/company`, {
    method: 'POST',

    next: { revalidate: 0 },
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(company),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Erro desconhecido ao adicionar item')
  }

  return data
}
