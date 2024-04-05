import { api } from '@/lib/api-fetch'
import { PaymentSchema } from '@/schemas/payment'
import { cookies } from 'next/headers'
import { z } from 'zod'

type PaymentTypes = z.infer<typeof PaymentSchema>

export default async function createPayment(
  payment: PaymentTypes,
): Promise<PaymentTypes> {
  const cookieStore = cookies()

  const token = cookieStore.get('@auth_accessToken')
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
