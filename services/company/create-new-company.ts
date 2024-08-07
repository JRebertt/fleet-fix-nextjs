'use server'

import { Company, GetCompanyResponse } from '@/@types/company-table'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { COOKIE_NAME } from '@/lib/cookies'

type CompnayWithoutId = Omit<Company, 'id'>

export default async function createComapny(
  company: CompnayWithoutId,
): Promise<Company> {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/company`, {
    method: 'POST',

    next: { revalidate: 0 },
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
    body: JSON.stringify(company),
  })

  const { company: CompanyResponse }: GetCompanyResponse = await res.json()

  return CompanyResponse
}
