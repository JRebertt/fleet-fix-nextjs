'use server'

import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { COOKIE_NAME } from '@/lib/cookies'

export default async function getPaymentsMetricas() {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/payment-metrics`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token?.value}`,
      'Content-Type': 'application/json',
    },
  })

  const payments = await res.json()

  return payments || []
}
