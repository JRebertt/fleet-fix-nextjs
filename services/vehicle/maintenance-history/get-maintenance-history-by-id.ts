import { MaintenanceHistory } from '@/@types/maintenance.table'
import { env } from '@/env/env-validation'

export default async function getMaintenanceHistoryById(
  vehicleId: string,
  id: string,
): Promise<MaintenanceHistory> {
  const res = await fetch(
    `${env.BASEURL}/api/vehicle/${vehicleId}/maintenance-history/${id}`,
    {
      method: 'GET',
      next: { revalidate: 1 },
    },
  )
  const data = await res.json()

  return data || []
}
