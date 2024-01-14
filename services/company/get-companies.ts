import { Company } from '@/@types/company-table'

export default async function getCompanies(): Promise<Company[]> {
  const res = await fetch('http://localhost:3000/api/company', {
    cache: 'no-store',
  })

  const data = await res.json()

  return data || []
}
