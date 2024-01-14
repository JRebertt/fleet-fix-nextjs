import { Company } from '@/@types/company-table'
import { env } from '@/env/env-validation'

export default async function getCompanies(): Promise<Company[]> {
  const res = await fetch(`http://127.0.0.1:3000/api/company`, {
    cache: 'no-store',
  })

  const data = await res.json()

  return data || []
}
