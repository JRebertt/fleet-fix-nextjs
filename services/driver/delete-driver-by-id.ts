import { env } from '@/env/env-validation'
import { toast } from 'sonner'

export async function deleteDriverById(id?: string) {
  const res = await fetch(`http://127.0.0.1:3000/api/driver/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Falha ao deletar o veículo')
  }

  return toast('O item foi deletado')
}
