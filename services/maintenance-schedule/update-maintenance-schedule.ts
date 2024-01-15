import { MaintenanceSchedule } from '@/@types/maintenance.table'
import { api } from '@/lib/api-fetch'
import { toast } from 'sonner'

export default async function updateMaintenanceSchedule(
  id: string,
  updatedData: Partial<MaintenanceSchedule>,
): Promise<MaintenanceSchedule> {
  const res = await api(`/maintenance-schedule/${id}`, {
    method: 'PATCH',
    next: { revalidate: 0 },
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })

  const data = await res.json()

  return data && toast('Atualizado com sucesso')
}
