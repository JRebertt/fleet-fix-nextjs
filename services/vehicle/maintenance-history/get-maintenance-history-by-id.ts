import { MaintenanceHistory } from '@/@types/maintenance.table'

export default async function getMaintenanceHistoryById(
  vehicleId: string,
  id: string,
): Promise<MaintenanceHistory> {
  const res = await fetch(
    `http://localhost:3000/api/vehicle/${vehicleId}/maintenance-history/${id}`,
    {
      method: 'GET',
      next: { revalidate: 1 },
    },
  )
  const data = await res.json()

  return data || []
}
