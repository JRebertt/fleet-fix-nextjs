import { DataTable } from '@/components/data-table'
import { columns } from './columns'
import { z } from 'zod'
import { vehicleSchema } from '@/schemas/vehicle'
import { api } from '@/lib/api-fetch'

type Value = z.infer<typeof vehicleSchema>

async function getData(): Promise<Value[]> {
  const response = await api('/vehicles')

  console.log(response)

  const data = await response.json()

  console.log('data aqui', data)

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
