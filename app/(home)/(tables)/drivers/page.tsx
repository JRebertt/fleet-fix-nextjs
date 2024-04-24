import { DataTable } from '@/components/data-table'
import { Toaster } from '@/components/ui/sonner'
import { columns } from './columns'
import { Driver } from '@/@types/driver-table'
import getDrivers from '@/services/driver/get-drivers'
import { Plus } from 'lucide-react'

export default async function DriverPage() {
  const drivers: Driver[] = await getDrivers()
  return (
    <>
      <section>
        <Toaster />

        <div className="container">
          <DataTable
            filterColumnName="name"
            columns={columns}
            data={drivers}
            routerForm="/drivers/register-driver"
            buttonText={<Plus size={20} />}
          />
        </div>
      </section>
    </>
  )
}
