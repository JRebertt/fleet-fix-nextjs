import { Company } from '@/@types/company-table'
import { env } from '@/env/env-validation'

export default async function getCompanies(): Promise<Company[]> {
  const res = await fetch(`${env.BASEURL}:3000/api/company`, {
    cache: 'no-store',
  })

  const data = await res.json()

  return data || []
}
