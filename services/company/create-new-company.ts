import { Company } from '@/@types/company-table'

export default async function createNewComapny(
  company: Company,
): Promise<Company> {
  const res = await fetch('http://localhost:3000/api/company', {
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
