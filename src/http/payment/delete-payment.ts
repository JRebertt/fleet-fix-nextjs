import { api } from '../api-client'
interface DeletePaymentRequest {
  id: string
}

export async function deletePayment({ id }: DeletePaymentRequest) {
  const result = await api.delete(`payment/${id}/delete`)

  return result
}
