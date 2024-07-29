/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../api-client'

interface CanceledPaymentRequest {
  id: string
  data: any
}

export async function canceledPayment({ id, data }: CanceledPaymentRequest) {
  const result = await api.put(`payment/${id}/update`, {
    json: {
      ...data,
      status: 'Canceled',
    },
  })

  return result
}
