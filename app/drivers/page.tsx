import { DataTable } from '@/components/data-table'
import { Toaster } from '@/components/ui/sonner'
import { columns } from './columns'
import { Driver } from '@/@types/driver-table'
import getDrivers from '@/services/driver/get-drivers'
import DriverForm from '@/components/driver-form'

export default async function DriverPage() {
  const drivers: Driver[] = await getDrivers()
  return (
    <>
      <section className="py-12">
        <Toaster />

        <div className="container">
          <h1 className="text-3xl font-bold pb-6">Motorista</h1>
          <DataTable
            columns={columns}
            data={drivers}
            formComponent={<DriverForm />}
          />
        </div>
      </section>
    </>
  )
}
