'use server'

import { Company, FetchCompanyResponse } from '@/@types/company-table'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { COOKIE_NAME } from '@/lib/cookies'

export default async function fetchCompanies(): Promise<Company[]> {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/companies`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
  })

  const { companies }: FetchCompanyResponse = await res.json()

  return companies || []
}
