import { api } from '@/lib/api-fetch'

export default async function getMaintenanceHistory(
  id: string,
): Promise<any[]> {
  const res = await api(`/vehicle/${id}/maintenance-history`, {
    cache: 'no-store',
  })
  const data = await res.json()

  return data || []
}
