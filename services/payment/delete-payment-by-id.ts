import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { toast } from 'sonner'

type deletePaymentByIdResponse = {
  message: string
}

export default async function deletePaymentById(id: string) {
  const cookieStore = cookies()

  const token = cookieStore.get('@auth_accessToken')
  const res = await api(`/payment/${id}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
  })

  const { message }: deletePaymentByIdResponse = await res.json()

  return toast(message)
}
