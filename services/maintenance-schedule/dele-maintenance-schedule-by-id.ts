import { api } from '@/lib/api-fetch'
import { toast } from 'sonner'

export default async function deleteMaintenanceScheduleById(id?: string) {
  const res = await api(`/maintenance-schedule/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Falha ao deletar item')
  }

  return toast('O item foi deletado')
}
