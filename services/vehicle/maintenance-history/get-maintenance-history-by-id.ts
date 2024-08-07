import { api } from '@/lib/api-fetch'

export default async function getMaintenanceHistoryById(
  vehicleId: string,
  id: string,
): Promise<any> {
  const res = await api(`/vehicle/${vehicleId}/maintenance-history/${id}`, {
    method: 'GET',
    next: { revalidate: 1 },
  })
  const data = await res.json()

  return data || []
}
