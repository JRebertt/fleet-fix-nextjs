import { MaintenanceSchedule } from '@/@types/maintenance.table'

export default async function getMaintenanceSchedule(): Promise<
  MaintenanceSchedule[]
> {
  const res = await fetch('http://localhost:3000/api/maintenance-schedule', {
    method: 'GET',
    next: { revalidate: 1800 },
  })

  const data = await res.json()

  return data || []
}
