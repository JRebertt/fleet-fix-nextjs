import { env } from '@/env/env-validation'
import { toast } from 'sonner'

export default async function deleteCompanyById(id?: string) {
  const res = await fetch(`${env.BASEURL}/api/company/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Falha ao deletar item')
  }

  return toast('O item foi deletado')
}
