import { Vehicle } from '@/@types/vehicle-table'

export default async function createNewVehicle(
  vehicle: Vehicle,
): Promise<Vehicle> {
  const res = await fetch('http://localhost:3000/api/vehicle', {
    method: 'POST',

    next: { revalidate: 0 },
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Erro desconhecido ao adicionar veículo')
  }

  return data
}
