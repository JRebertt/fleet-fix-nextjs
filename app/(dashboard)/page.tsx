import { MaintenanceSchedule } from '@/@types/maintenance.table'

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'

import { api } from '@/lib/api-fetch'
import { format, formatDistanceToNow } from 'date-fns'
import { Toaster } from 'sonner'
import { ButtonStart } from './button-start'
import { Options } from './options'
import { Header } from './header'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ptBR } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

async function getMaintenanceSchedule(): Promise<MaintenanceSchedule[]> {
  const response = await api('/maintenance-schedule', {
    method: 'GET',
    cache: 'no-store',
  })

  const maintenanceSchedule = await response.json()

  return maintenanceSchedule
}

export default async function Home() {
  const schedule = await getMaintenanceSchedule()

  return (
    <>
      <Toaster />
      <main className="min-h-screen p-10 space-y-14">
        <Header />
        <section className="px-4 grid grid-cols-3 justify-items-center gap-28">
          {schedule.map((data, i) => {
            const dateObject = new Date(data.scheduledDate)
            const formattedDateV2 = format(dateObject, 'dd/MM/yyyy')
            const formattedDate = formatDistanceToNow(dateObject, {
              addSuffix: true,
              locale: ptBR,
            })

            const divClass = cn({
              'bg-red-500': data.priority === 'Alta',
              'bg-yellow-500': data.priority === 'Média',
              'bg-blue-500': data.priority === 'Baixa',
              'bg-teal-500': data.priority === 'Normal',
            })
            return (
              <Card
                key={i++}
                className="w-96 max-h-52 p-4 flex flex-col gap-2 justify-center items-center"
              >
                <CardHeader className="flex flex-row w-full py-1 px-0 items-center justify-between">
                  <h3 className="max-w-40 font-semibold">{data.description}</h3>
                  <div className="space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className={cn(
                              'p-1.5 rounded-full cursor-default',
                              divClass,
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-64">
                          <p className="text-sm text-muted-foreground">
                            Indicador do nível de prioridade.
                          </p>
                          <small className="text-sm font-medium leading-none mr-1">
                            Prioridade:
                          </small>
                          {data.priority}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Options value={data} />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex space-x-2">
                    <span className="font-bold space-x-2 bg-slate-500/">
                      Id do Veiculo:
                    </span>
                    <p>{data.vehicleId}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="font-bold">Status:</span>
                    <Badge variant={'outline'}>{data.status}</Badge>
                  </div>
                </CardContent>
                <div className="w-full flex justify-between items-center">
                  <CardDescription className="p-0">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{formattedDate}</TooltipTrigger>
                        <TooltipContent>
                          <p>{formattedDateV2}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardDescription>
                  <CardFooter className="p-0">
                    <ButtonStart value={data} />
                  </CardFooter>
                </div>
              </Card>
            )
          })}
        </section>
      </main>
    </>
  )
}
