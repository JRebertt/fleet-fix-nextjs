import { DataTable } from '@/components/data-table'
import { Vehicle, columns } from './columns'

async function getData(): Promise<Vehicle[]> {
  const res = await fetch(
    'https://65810f263dfdd1b11c425d28.mockapi.io/vehicles',
  )
  const data = await res.json()

  return data
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold pb-6">Todos Veiculos</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  )
}
