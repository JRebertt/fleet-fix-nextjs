import { Payment } from '@/@types/payment'
import { api } from '@/lib/api-fetch'

type GetPaymentByIdResponse = {
  payment: Payment
}

export async function getPaymentById(id: string): Promise<Payment> {
  const res = await api(`/payment/${id}`, {
    method: 'GET',
  })
  const { payment }: GetPaymentByIdResponse = await res.json()
  return payment
}
