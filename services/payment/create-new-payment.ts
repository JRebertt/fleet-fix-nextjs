import { api } from '@/lib/api-fetch'
import { PaymentSchema } from '@/schemas/payment'
import { z } from 'zod'

type PaymentTypes = z.infer<typeof PaymentSchema>

export default async function createPayment(
  payment: PaymentTypes,
): Promise<PaymentTypes> {
  const res = await api(`/payment`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payment),
  })

  const data = await res.json()

  return data
}
