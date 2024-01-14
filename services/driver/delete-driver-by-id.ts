import { env } from '@/env/env-validation'
import { toast } from 'sonner'

export async function deleteDriverById(id?: string) {
  const res = await fetch(`${env.BASEURL}:3000/api/driver/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Falha ao deletar o veículo')
  }

  return toast('O item foi deletado')
}
