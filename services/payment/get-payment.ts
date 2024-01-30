import { api } from '@/lib/api-fetch'
import { PaymentSchemas } from '@/schemas/payment'
import { z } from 'zod'

type PaymentTypes = z.infer<typeof PaymentSchemas>

export default async function getPayment(): Promise<PaymentTypes[]> {
  const res = await api(`/payment`, {
    method: 'GET',
    cache: 'no-store',
  })

  const data = await res.json()

  return data || []
}
