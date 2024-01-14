import { MaintenanceHistory } from '@/@types/maintenance.table'

export default async function getMaintenanceHistory(
  id: string,
): Promise<MaintenanceHistory[]> {
  const res = await fetch(
    `http://localhost:3000/api/vehicle/${id}/maintenance-history`,
    { cache: 'no-store' },
  )
  const data = await res.json()

  return data || []
}
