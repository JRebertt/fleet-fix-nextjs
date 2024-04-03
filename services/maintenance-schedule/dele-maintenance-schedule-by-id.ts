import { api } from '@/lib/api-fetch'
import { toast } from 'sonner'

type deleteMaintenaceByIdResponse = {
  message: string
}

export default async function deleteMaintenanceScheduleById(id: string) {
  const res = await api(`/maintenance/${id}/delete`, {
    method: 'DELETE',
  })

  const { message }: deleteMaintenaceByIdResponse = await res.json()

  return toast(message)
}
