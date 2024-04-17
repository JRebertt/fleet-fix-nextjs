'use client'

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

import { Badge } from '@/components/ui/badge'

import { GetMaintenanceSchedule } from '@/@types/maintenance-table'
import { ButtonStart } from './button-start'
import { useEffect, useState } from 'react'
import { Vehicle } from '@/@types/vehicle-table'
import { getVehicleById } from '@/services/vehicle/get-vehicles-by-id'
import { formatDates } from '@/lib/formtDate'
import { ActionsComponents } from './actions-components'

function ScheduleCard({ data }: { data: GetMaintenanceSchedule }) {
  const [vehicle, setVehicles] = useState<Vehicle>()
  // const divClass = cn({
  //   'bg-red-500': data.priority === 'Alta',
  //   'bg-yellow-500': data.priority === 'Média',
  //   'bg-teal-500': data.priority === 'Baixa',
  // })

  const { formattedDate: simpleCreatedAt, timeUntilNow: detailsCreatedAt } =
    formatDates(data.created_at, {
      formatDate: 'dd/MM/yyyy HH:mm:ss',
    })

  const { formattedDate: simpleScheduleDate } = formatDates(
    data.scheduledDate,
    {
      formatDate: 'dd/MM/yyyy',
    },
  )

  useEffect(() => {
    const fetchData = async () => {
      const vehiclesList = await getVehicleById(data.vehicle_id)
      setVehicles(vehiclesList)
    }
    fetchData()
  }, [data.vehicle_id])

  const statusTranslations = {
    Scheduled: 'Agendado',
    InProgress: 'Em Andamento',
    OnHold: 'Em Espera',
    Completed: 'Concluído',
    Canceled: 'Cancelado',
    Failed: 'Falhou',
  }

  return (
    <Card className="min-h-60 p-4 flex flex-col gap-2 justify-center">
      <CardHeader className="flex flex-row w-full py-1 px-0 items-center justify-between">
        <h3 className="max-w-48 text-sm font-semibold">{data.title}</h3>
        <div className="space-x-2 flex ">
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                className={cn('p-1.5 rounded-full cursor-default', divClass)}
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
          </TooltipProvider> */}

          <ActionsComponents id={data.id} />

          {/* 
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer">
                Ver detalhes
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(`Copiado`)}
              >
                Copiar informações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                onClick={() => deleteMaintenanceScheduleById(data.id)}
              >
                Delete
                <DropdownMenuShortcut>
                  <Trash size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          */}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex space-x-2">
          <span className="font-bold space-x-2 bg-slate-500/">Veiculo:</span>
          <p>{vehicle?.model}</p>
        </div>
        <div className="flex space-x-2">
          <span className="font-bold">Status:</span>
          <Badge variant={'outline'}>
            {statusTranslations[data.status] || data.status}
          </Badge>
        </div>
        <div className="flex space-x-2">
          <span className="font-bold">Data:</span>
          <Badge variant={'outline'}>{simpleScheduleDate}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{data.description}</p>
      </CardContent>
      <div className="w-full flex justify-between items-center">
        <CardDescription className="p-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{detailsCreatedAt}</TooltipTrigger>
              <TooltipContent>
                <p>{simpleCreatedAt}</p>
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
}

export default ScheduleCard
