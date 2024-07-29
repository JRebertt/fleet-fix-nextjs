import { api } from '../api-client'

interface GetVehiclesResponse {
  vehicles: {
    id: string
    make: string
    model: string
    year: string
    licensePlate: string
    vin: string
    driverId: string
    companyId: string
  }[]
}

export async function getVehicles() {
  const result = await api.get('vehicles').json<GetVehiclesResponse>()

  return result
}
