import { api } from '@/lib/api-fetch'
import { PaymentSchemas } from '@/schemas/payment'
import { toast } from 'sonner'
import { z } from 'zod'

type PaymentValues = z.infer<typeof PaymentSchemas>

export default async function updatePayments(
  id: string,
  updatedData: Partial<PaymentValues>,
): Promise<PaymentValues> {
  const res = await api(`/payment/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })

  const data = await res.json()

  return data && toast('Atualizado com sucesso')
}
