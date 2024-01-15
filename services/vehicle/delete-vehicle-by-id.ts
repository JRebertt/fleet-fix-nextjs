import { api } from '@/lib/api-fetch'
import { toast } from 'sonner'

export default async function deleteVehicleById(id?: string) {
  const res = await api(`/vehicle/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Falha ao deletar item')
  }

  return toast('O item foi deletado')
}
