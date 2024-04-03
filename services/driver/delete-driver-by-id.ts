import { api } from '@/lib/api-fetch'
import { toast } from 'sonner'

type deleteDriverByIdResponse = {
  messege: string
}

export async function deleteDriverById(id: string) {
  const res = await api(`/driver/${id}/delete`, {
    method: 'DELETE',
  })

  const { messege }: deleteDriverByIdResponse = await res.json()

  return toast(messege)
}
