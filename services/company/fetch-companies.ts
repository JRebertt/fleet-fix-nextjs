import { Company, FetchCompanyResponse } from '@/@types/company-table'
import { api } from '@/lib/api-fetch'

export default async function fetchCompanies(): Promise<Company[]> {
  const res = await api(`/companies`, {
    cache: 'no-store',
  })

  const { companies }: FetchCompanyResponse = await res.json()

  return companies || []
}
