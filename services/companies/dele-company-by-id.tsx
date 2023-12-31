import { toast } from 'sonner'

export default async function deleteCompanyById(id: string) {
  const res = await fetch(`http://localhost:3000/api/company/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Falha ao deletar item')
  }

  return toast('O item foi deletado')
}
