import { toast } from 'sonner'

export async function deleteVehicleById(id?: string) {
  const res = await fetch(`http://localhost:3000/api/vehicle/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Falha ao deletar o veículo')
  }

  return toast('O item foi deletado')
}
