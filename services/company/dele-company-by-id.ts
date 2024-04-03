import { api } from '@/lib/api-fetch'
import { toast } from 'sonner'

type deleteCompanyByIdResponse = {
  message: string
}

export default async function deleteCompanyById(id: string) {
  const res = await api(`/company/${id}/delete`, {
    method: 'DELETE',
  })

  const { message }: deleteCompanyByIdResponse = await res.json()

  return toast(message)
}
