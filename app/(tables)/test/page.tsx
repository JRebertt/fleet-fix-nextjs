import { DataTable } from '@/components/data-table'
import { columns } from './columns'
import { api } from '@/lib/api-fetch'
import { Vehicle } from '@/@types/vehicle-table'

async function getData(): Promise<Vehicle[]> {
  const response = await api('/vehicles', {
    cache: 'no-store',
  })

  const data = await response.json()

  return data
}

export default async function TestPage() {
  const vehicles = await getData()
  return (
    <section>
      <DataTable columns={columns} data={vehicles} filterColumnName="model" />

      {vehicles.map((vehicle, i) => (
        <p key={i++}>{vehicle.model}</p>
      ))}
    </section>
  )
}
