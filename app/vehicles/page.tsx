// 'use client'

import { DataTable } from '@/components/data-table'
import { columns } from './columns'

import { Toaster } from '@/components/ui/sonner'
import VehicleForm from '@/components/vehicle-form'
import { Vehicle } from '@/@types/vehicle-table'

async function getData() {
  const res = await fetch('http://localhost:3000/api/vehicles')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function DemoPage() {
  // const [vehicles, setVehicles] = useState<Vehicle[]>([])

  // useEffect(() => {
  //   async function loadVehicles() {
  //     try {
  //       const vehicleData = await getVehicles()
  //       setVehicles(vehicleData)
  //     } catch (error) {
  //       console.error('Erro ao carregar veículos:', error)
  //     }
  //   }

  //   loadVehicles()
  // }, [vehicles])

  const data = await getData()
  return (
    <>
      <section className="py-12">
        <Toaster />

        <div className="container">
          <h1 className="text-3xl font-bold pb-6">Todos Veiculos</h1>
          <DataTable
            filterColumnName="model"
            columns={columns}
            data={data}
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
