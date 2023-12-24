'use client'
import { DataTable } from '@/components/data-table'
import { columns } from './columns'

import getVehicles from '@/services/get-vehicles'
import { Toaster } from '@/components/ui/sonner'
import { useEffect, useState } from 'react'
import { Vehicle } from '@/@types/tables'

export default function DemoPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    async function loadVehicles() {
      try {
        const vehicleData = await getVehicles()
        setVehicles(vehicleData)
      } catch (error) {
        console.error('Erro ao carregar veículos:', error)
      }
    }

    loadVehicles()
  }, [vehicles])

  return (
    <>
      <section className="py-12">
        <Toaster />

        <div className="container">
          <h1 className="text-3xl font-bold pb-6">Todos Veiculos</h1>
          <DataTable columns={columns} data={vehicles} />
        </div>
      </section>
    </>
  )
}
