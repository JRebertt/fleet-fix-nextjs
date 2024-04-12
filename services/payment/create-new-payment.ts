'use server'

import { api } from '@/lib/api-fetch'
import { PaymentSchema } from '@/schemas/payment'
import { cookies } from 'next/headers'
import { COOKIE_NAME } from '@/lib/cookies'

import { z } from 'zod'

type PaymentTypes = z.infer<typeof PaymentSchema>

export default async function createPayment(
  payment: PaymentTypes,
): Promise<PaymentTypes> {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/payment`, {
    method: 'POST',

    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payment),
  })

  const data = await res.json()

  return data
}
