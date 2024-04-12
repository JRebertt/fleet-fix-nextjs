import { DataTable } from '@/components/data-table'
import { columns } from './columns'

import { Toaster } from '@/components/ui/sonner'
import VehicleForm from '@/components/vehicle-form'
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
            formComponent={<VehicleForm />}
            dialogTitle="Adicionar Novo Veículo"
            dialogDescription="Preencha as informações abaixo para adicionar um novo veículo ao
            sistema. Clique em salvar ao concluir."
            buttonText={<Plus size={20} />}
          />
        </div>
      </section>
    </>
  )
}
