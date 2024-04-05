import { api } from '@/lib/api-fetch'
import { PaymentSchema } from '@/schemas/payment'
import { cookies } from 'next/headers'
import { toast } from 'sonner'
import { z } from 'zod'

type PaymentValues = z.infer<typeof PaymentSchema>

export default async function updatePayments(
  id: string,
  updatedData: Partial<PaymentValues>,
): Promise<PaymentValues> {
  const cookieStore = cookies()

  const token = cookieStore.get('@auth_accessToken')
  const res = await api(`/payment/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })

  const data = await res.json()

  return data && toast('Atualizado com sucesso')
}
