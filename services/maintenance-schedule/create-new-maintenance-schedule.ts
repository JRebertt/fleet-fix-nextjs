import { MaintenanceSchedule } from '@/@types/maintenance.table'

export default async function createNewMaintenanceSchedule(
  maintenanceSchedule: MaintenanceSchedule,
): Promise<MaintenanceSchedule> {
  const res = await fetch('http://localhost:3000/api/maintenance-schedule', {
    method: 'POST',

    next: { revalidate: 0 },
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(maintenanceSchedule),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Erro desconhecido ao adicionar item')
  }

  return data
}
