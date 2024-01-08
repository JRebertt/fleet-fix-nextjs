// 'use client'

import { DataTable } from '@/components/data-table'
import { columns } from './columns'

import { Toaster } from '@/components/ui/sonner'
import VehicleForm from '@/components/vehicle-form'
import getVehicles from '@/services/vehicle/get-vehicles'

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

  const vehicles = await getVehicles()

  return (
    <>
      <section className="py-12">
        <Toaster />

        <div className="container">
          <h1 className="text-3xl font-bold pb-6">Todos Veiculos</h1>
          <DataTable
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
