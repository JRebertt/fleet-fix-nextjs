import { Company } from '@/@types/company-table'

export default async function getCompanies(): Promise<Company[]> {
  const res = await fetch('http://localhost:3000/api/company', {
    method: 'GET',
    next: { revalidate: 1800 },
  })

  const data = await res.json()

  return data || []
}
