import { api } from '@/lib/api-fetch'
import { PaymentSchemas } from '@/schemas/payment'
import { z } from 'zod'

type PaymentTypes = z.infer<typeof PaymentSchemas>

export default async function createNewPayment(
  payment: PaymentTypes,
): Promise<PaymentTypes> {
  const res = await api(`/payment`, {
    method: 'POST',

    next: { revalidate: 0 },
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payment),
  })

  const data = await res.json()

  return data
}
