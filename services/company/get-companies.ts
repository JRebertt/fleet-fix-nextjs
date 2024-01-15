import { Company } from '@/@types/company-table'
import { api } from '@/lib/api-fetch'

export default async function getCompanies(): Promise<Company[]> {
  const res = await api(`/company`, {
    cache: 'no-store',
  })

  const data = await res.json()

  return data || []
}
