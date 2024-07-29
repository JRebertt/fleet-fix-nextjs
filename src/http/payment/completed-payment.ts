import { api } from '../api-client'

interface CompletedPaymentRequest {
  id: string
  paymentDate: Date
  paymentMethod: string
}

export async function completedPayment({
  id,
  paymentDate,
  paymentMethod,
}: CompletedPaymentRequest) {
  const result = await api.put(`payment/${id}/complete`, {
    json: {
      paymentDate,
      paymentMethod,
    },
  })
  return result
}
