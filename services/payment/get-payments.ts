'use server'

import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { COOKIE_NAME } from '@/lib/cookies'
import { Payment } from '@/@types/payment'

export interface PaymentsResponse {
  payments: Payment[]
}

export default async function getPayments(): Promise<Payment[]> {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/payments`, {
    method: 'Get',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token?.value}`,
      'Content-Type': 'application/json',
    },
  })

  const { payments }: PaymentsResponse = await res.json()

  return payments || []
}
