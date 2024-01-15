import { Company } from '@/@types/company-table'
import { api } from '@/lib/api-fetch'

export default async function createNewComapny(
  company: Company,
): Promise<Company> {
  const res = await api(`/company`, {
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
