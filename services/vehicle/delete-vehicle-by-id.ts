import { env } from '@/env/env-validation'
import { toast } from 'sonner'

export default async function deleteVehicleById(id?: string) {
  const res = await fetch(`${env.BASEURL}:3000/api/vehicle/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Falha ao deletar item')
  }

  return toast('O item foi deletado')
}
