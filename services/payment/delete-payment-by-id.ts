import { api } from '@/lib/api-fetch'
import { toast } from 'sonner'

type deletePaymentByIdResponse = {
  message: string
}

export default async function deletePaymentById(id: string) {
  const res = await api(`/payment/${id}/delete`, {
    method: 'DELETE',
  })

  const { message }: deletePaymentByIdResponse = await res.json()

  return toast(message)
}
