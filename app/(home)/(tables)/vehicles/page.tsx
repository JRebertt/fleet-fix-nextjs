import { DataTable } from '@/components/data-table'
import { columns } from './columns'

import { Toaster } from '@/components/ui/sonner'
import getVehicles from '@/services/vehicle/get-vehicles'
import { Plus } from 'lucide-react'

export default async function DemoPage() {
  const vehicles = await getVehicles()

  return (
    <>
      <section>
        <Toaster />
        <div className="container">
          <DataTable
            filterColumnName="model"
            columns={columns}
            data={vehicles}
            routerForm="/vehicles/register-vehicle"
            buttonText={<Plus size={20} />}
          />
        </div>
      </section>
    </>
  )
}
