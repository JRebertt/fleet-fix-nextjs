import { MaintenanceSchedule } from '@/@types/maintenance.table'

export default async function createNewMaintenanceSchedule(
  maintenanceSchedule: MaintenanceSchedule,
): Promise<MaintenanceSchedule> {
  console.log(maintenanceSchedule.scheduledDate)

  const res = await fetch('http://localhost:3000/api/maintenance-schedule', {
    method: 'POST',

    next: { revalidate: 0 },
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(maintenanceSchedule),
  })

  const data = await res.json()
  console.log(data)

  return data
}
