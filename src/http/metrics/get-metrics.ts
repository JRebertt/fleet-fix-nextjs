import { api } from '../api-client'

interface GetMetricsResponse {
  metrics: {
    totalMaintenances: number
    totalCost: number
    averageCost: number
    averageResolutionTime: number
  }
}

export default async function getMetrics() {
  const result = await api.get('metrics').json<GetMetricsResponse>()

  return result
}
