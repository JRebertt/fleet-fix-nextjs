import { Payment } from '@/@types/payment'
import { api } from '@/lib/api-fetch'

type PaymentResponse = {
  payment: Payment
}

export default async function completePayment(
  id: string,
  paymentDate: Date,
  paymentMethod: 'Card' | 'Boleto' | 'Transfer' | 'Cash' | 'Pix',
): Promise<Payment> {
  const res = await api(`/payment/${id}/complete`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentDate, paymentMethod }),
  })

  const { payment }: PaymentResponse = await res.json()

  return payment
}
