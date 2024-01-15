import { DataTable } from '@/components/data-table'
import { columns } from './columns'

import { Toaster } from '@/components/ui/sonner'
import VehicleForm from '@/components/vehicle-form'
import { Vehicle } from '@/@types/vehicle-table'
import { api } from '@/lib/api-fetch'

async function getListVehicles(): Promise<Vehicle[]> {
  const response = await api('/vehicles', {
    method: 'GET',
    cache: 'no-store',
  })

  const vehicles = await response.json()
  return vehicles
}

export default async function DemoPage() {
  const vehicles = await getListVehicles()

  return (
    <>
      <section className="py-12">
        <Toaster />

        <div className="container">
          <h1 className="text-3xl font-bold pb-6">Todos Veiculos</h1>
          <DataTable
            filterColumnName="model"
            columns={columns}
            data={vehicles}
            formComponent={<VehicleForm />}
            dialogTitle="Adicionar Novo Veículo"
            dialogDescription="Preencha as informações abaixo para adicionar um novo veículo ao
            sistema. Clique em salvar ao concluir."
            buttonText="Novo Veículo"
          />
        </div>
      </section>
    </>
  )
}
