import { MaintenanceSchedule } from '@/@types/maintenance.table'
import { env } from '@/env/env-validation'

export default async function getMaintenanceSchedule(): Promise<
  MaintenanceSchedule[]
> {
  const res = await fetch(`http://127.0.0.1:3000/api/maintenance-schedule`, {
    cache: 'no-store',
  })

  const data = await res.json()

  return data || []
}
