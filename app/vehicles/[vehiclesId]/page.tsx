import * as React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { getVehicleById } from '@/services/vehicle/get-vehicles-by-id'
import getMaintenanceHistory from '@/services/vehicle/maintenance-history/get-maintenance-history'
import { columns } from './columns'
import { getDriverById } from '@/services/driver/get-driver-by-id'
import Image from 'next/image'

export default async function VehicleProfile({
  params,
}: {
  params: { vehiclesId: string }
}) {
  const data = await getVehicleById(params.vehiclesId)
  const maintenanceHistory = await getMaintenanceHistory(params.vehiclesId)
  console.log(data.driver)
  const driverData = await getDriverById(data.driver)
  console.log(driverData.nickname)
  return (
    <>
      <section className="w-full grid grid-rows-2 md:gap-4 p-4 items-center">
        <section className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 h-auto sm:h-[32rem]">
          <div className="grid grid-rows-2 gap-6">
            <div className="grid justify-items-center items-center">
              <Carousel className="w-full max-w-xs sm:max-w-xl">
                <CarouselContent>
                  <CarouselItem>
                    <div className="">
                      <div className="h-[20rem] flex justify-center items-center p-4">
                        {/* <Image
                          src={'https://picsum.photos/id/1/900/600'}
                          alt="img"
                          width={1000}
                          height={600}
                          className=""
                          objectFit="cover"
                        /> */}
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-center items-center">
              <Card className="py-4 h-24">
                <CardHeader className="p-0">KM Atual</CardHeader>
                <CardContent className="p-0">{data.currentMileage}</CardContent>
              </Card>
              <Card className="py-4 h-24">
                <CardHeader className="p-0">Status</CardHeader>
                <CardContent className="p-0">{data.vehicleStatus}</CardContent>
              </Card>
              <Card className="py-4 h-24">
                <CardHeader className="p-0">Motorista</CardHeader>
                <CardContent className="p-0">{driverData.fullName}</CardContent>
              </Card>
            </div>
          </div>
          <Card className="w-full min-h-[10rem] sm:max-h-[35.5rem] py-4 px-6 rounded-lg">
            <ul className="grid grid-cols-2 gap-4">
              <li className="flex items-center space-x-2">
                <span className="font-semibold text-lg">Modelo:</span>
                <span className="text-sm">{data.model}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="font-semibold text-lg">Placa:</span>
                <span className="text-sm">{data.licensePlate}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="font-semibold text-lg">Número do Chassi:</span>
                <span className="text-sm">{data.chassisNumber}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="font-semibold text-lg">Ano:</span>
                <span className="text-sm">{data.year}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="font-semibold text-lg">Data de Compra:</span>
                <span className="text-sm">{data.purchaseDate}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="font-semibold text-lg">
                  Número do Renavam:
                </span>
                <span className="text-sm">{data.renavamNumber}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="font-semibold text-lg">Número do CRLVE:</span>
                <span className="text-sm">{data.crlveNumber}</span>
              </li>
            </ul>
          </Card>
        </section>

        <section className="">
          <div className="col-span-2">
            <DataTable
              columns={columns}
              data={maintenanceHistory}
              filterColumnName="description"
            />
          </div>
        </section>
      </section>
    </>
  )
}
