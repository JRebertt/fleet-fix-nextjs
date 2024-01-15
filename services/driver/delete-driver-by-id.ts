import { api } from '@/lib/api-fetch'
import { toast } from 'sonner'

export async function deleteDriverById(id?: string) {
  const res = await api(`/driver/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Falha ao deletar o veículo')
  }

  return toast('O item foi deletado')
}
