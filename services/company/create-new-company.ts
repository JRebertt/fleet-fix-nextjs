import { Company, GetCompanyResponse } from '@/@types/company-table'
import { api } from '@/lib/api-fetch'
type CompnayWithoutId = Omit<Company, 'id'>

export default async function createComapny(
  company: CompnayWithoutId,
): Promise<Company> {
  const res = await api(`/company`, {
    method: 'POST',

    next: { revalidate: 0 },
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(company),
  })

  const { company: CompanyResponse }: GetCompanyResponse = await res.json()

  return CompanyResponse
}
