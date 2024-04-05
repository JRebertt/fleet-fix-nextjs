import { Card as CardShadcnUi } from '@/components/ui/card'

import { getVehicleById } from '@/services/vehicle/get-vehicles-by-id'
import { getDriverById } from '@/services/driver/get-driver-by-id'

import CustomProgress from '@/components/customProgress'
import { Image } from '@nextui-org/react'

export default async function VehicleProfile({
  params,
}: {
  params: { vehiclesId: string }
}) {
  const data = await getVehicleById(params.vehiclesId)

  const driverData = await getDriverById(data.driver_id)

  function calcularPorcentagemAutomatica(
    kmAtual: number,
    intervaloTroca: number,
  ) {
    const ultimaTroca = kmAtual - (kmAtual % intervaloTroca)

    const kmPercorridos = kmAtual - ultimaTroca

    const porcentagemPercorrida = (kmPercorridos / intervaloTroca) * 100

    return porcentagemPercorrida
  }

  const kmAtual = 35550
  const intervaloTroca = 20000

  const porcentagem = calcularPorcentagemAutomatica(kmAtual, intervaloTroca)

  console.log(driverData)

  return (
    <>
      <main className="w-full p-6 flex flex-col gap-6">
        <section className="flex flex-col sm:flex-row gap-6 justify-between">
          <CardShadcnUi className="max-w-3xl h-[26rem] w-full flex flex-col items-center sm:flex-row gap-4 p-2">
            <div className="w-full max-h-[495px]">
              <Image
                loading="lazy"
                width={455}
                height={495}
                alt="NextUI hero Image with delay"
                src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
              />
            </div>
            <div className="max-w-[16rem] h-full w-full flex flex-row gap-6 justify-between items-center sm:flex-col sm:justify-around">
              <CustomProgress aria-label="Teste" value={porcentagem} />
              <CustomProgress
                aria-label="Teste"
                value={0}
                formatOptions={{ style: 'unit', unit: 'kilometer' }}
              />
            </div>
          </CardShadcnUi>

          <CardShadcnUi className="max-w-xl w-full space-y-4 h-[26rem] flex flex-col max-h-[26rem]">
            <div className="w-full h-full max-h-56 bg-gray-300"></div>
            <div className="w-full h-full p-4">
              <ul className="grid sm:grid-row-1 sm:grid-cols-2 gap-2 justify-items-start sm:justify-items-center items-center text-center">
                <li className="flex gap-2 max-w-[16rem]">
                  <p className="text-base text-muted-foreground">Modelo:</p>
                  <h3 className="font-semibold text-sm tracking-wider">
                    {data.model}
                  </h3>
                </li>
                <li className="flex gap-2 max-w-[16rem]">
                  <p className="text-base text-muted-foreground">Placa</p>
                  <h3 className="font-semibold text-sm tracking-wider">
                    {data.licensePlate}
                  </h3>
                </li>
                <li className="flex gap-2 max-w-[16rem]">
                  <p className="text-base text-muted-foreground">Chassi</p>
                  <h3 className="font-semibold text-sm tracking-wider">
                    {data.vin}
                  </h3>
                </li>
                <li className="flex gap-2 max-w-[16rem]">
                  <p className="text-base text-muted-foreground">Ano</p>
                  <h3 className="font-semibold text-sm tracking-wider">
                    {data.year}
                  </h3>
                </li>
                <li className="flex gap-2 max-w-[16rem]">
                  <p className="text-base text-muted-foreground">Marca</p>
                  <h3 className="font-semibold text-sm tracking-wider">
                    {data.make}
                  </h3>
                </li>
                {/* <li className="flex gap-2 max-w-[16rem]">
                  <p className="text-base text-muted-foreground">Renavam</p>
                  <h3 className="font-semibold text-sm tracking-wider">
                    {data.renavamNumber}
                  </h3>
                </li>
                <li className="flex gap-2 max-w-[16rem]">
                  <p className="text-base text-muted-foreground">
                    Numero do Crlve
                  </p>
                  <h3 className="font-semibold text-sm tracking-wider">
                    {data.crlveNumber}
                  </h3>
                </li>
                <li className="flex gap-2 max-w-[16rem]">
                  <p className="text-base text-muted-foreground">KM:</p>
                  <h3 className="font-semibold text-sm tracking-wider">
                    {Number(data.currentMileage)}
                  </h3>
                </li> */}
              </ul>
            </div>
          </CardShadcnUi>
        </section>
        {/* <section>
          <ScrollArea className="hidden sm:block whitespace-nowrap rounded-md border">
            <CardShadcnUi className="w-full h-full max-h-40 max-w-full p-4 grid grid-cols-3">
              <div className="w-full flex items-center justify-between max-w-[26rem] space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div className="flex flex-col space-y-1 px-2">
                  <div className="flex gap-2">
                    <h2 className="text-base text-muted-foreground">Nome:</h2>
                    <p>{driverData.user?.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <h2 className="text-base text-muted-foreground">
                      Apelido:
                    </h2>
                    <p>{driverData.user?.email}</p>
                  </div>
                </div>
                <Separator orientation="vertical" />
              </div>
              <div className="w-full flex items-center justify-between px-4 max-w-[24rem]">
                <div className="flex flex-col space-y-1 px-2">
                  <div className="flex gap-2">
                    <h2 className="text-base text-muted-foreground">Contato</h2>
                    <p>{driverData.contact_number}</p>
                  </div>
                  <div className="flex gap-2">
                    <h2 className="text-base text-muted-foreground">CNH:</h2>
                    <p>{driverData.licenseNumber}</p>
                  </div>
                </div>
                <Separator orientation="vertical" />
              </div>
              <div className="w-full flex items-center justify-between px-4 max-w-[24rem]">
                <div className="flex flex-col space-y-1 px-2">
                  <div className="flex gap-2">
                    <h2 className="text-base text-muted-foreground">CPF</h2>
                    <p>{driverData.cpf}</p>
                  </div>
                  <div className="flex gap-2">
                    <h2 className="text-base text-muted-foreground">
                      Data de Nascimentos:
                    </h2>
                    <p>
                      {driverData.birthDate
                        ? driverData.birthDate.toLocaleDateString()
                        : 'Não informado'}
                    </p>
                  </div>
                </div>
              </div>
            </CardShadcnUi>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section> */}
        {/* <section>
          <div>
            <DataTable
              filterColumnName="description"
              columns={columns}
              data={maintenanceHistory}
            />
          </div>
        </section> */}
      </main>
    </>
  )
}
