import { MaintenanceHistory } from '@/@types/maintenance.table'
import { env } from '@/env/env-validation'

export default async function getMaintenanceHistory(
  id: string,
): Promise<MaintenanceHistory[]> {
  const res = await fetch(
    `${env.BASEURL}/api/vehicle/${id}/maintenance-history`,
    { cache: 'no-store' },
  )
  const data = await res.json()

  return data || []
}
