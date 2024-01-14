import { MaintenanceSchedule } from '@/@types/maintenance.table'
import { env } from '@/env/env-validation'

export default async function getMaintenanceSchedule(): Promise<
  MaintenanceSchedule[]
> {
  const res = await fetch(`${env.BASEURL}/api/maintenance-schedule`, {
    cache: 'no-store',
  })

  const data = await res.json()

  return data || []
}
