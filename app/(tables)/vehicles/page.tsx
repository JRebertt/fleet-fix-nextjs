'use client'

import { DataTable } from '@/components/data-table'
import { columns } from './columns'

import { Toaster } from '@/components/ui/sonner'
import VehicleForm from '@/components/vehicle-form'
import getVehicles from '@/services/vehicle/get-vehicles'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { vehicleSchema } from '@/schemas/vehicle'
import { Vehicle } from '@/@types/vehicle-table'

type VehiclesValues = z.infer<typeof vehicleSchema>

export default function DemoPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const vehicleList = await getVehicles()

      setVehicles(vehicleList)
    }
    fetchData()
  })

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
            buttonText="Novo Veículo"
          />
        </div>
      </section>
    </>
  )
}
