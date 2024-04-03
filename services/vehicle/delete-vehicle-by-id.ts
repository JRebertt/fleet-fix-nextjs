import { api } from '@/lib/api-fetch'
import { toast } from 'sonner'

type deleteVehicleByIdResponse = {
  message: string
}

export default async function deleteVehicleById(id: string) {
  const res = await api(`/vehicle/${id}/delete`, {
    method: 'DELETE',
  })

  const { message }: deleteVehicleByIdResponse = await res.json()

  return toast(message)
}
