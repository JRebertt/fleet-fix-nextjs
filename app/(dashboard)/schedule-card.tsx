'use client'

import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
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

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import deleteMaintenanceScheduleById from '@/services/maintenance-schedule/dele-maintenance-schedule-by-id'
import { MoreHorizontal, Trash } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'

import { MaintenanceSchedule } from '@/@types/maintenance.table'
import { ButtonStart } from './button-start'

function ScheduleCard({ data }: { data: MaintenanceSchedule }) {
  const dateObject = new Date(data.scheduledDate)
  const formattedDateV2 = format(dateObject, 'dd/MM/yyyy')
  const formattedDate = formatDistanceToNow(dateObject, {
    addSuffix: true,
    locale: ptBR,
  })

  const divClass = cn({
    'bg-red-500': data.priority === 'Alta',
    'bg-yellow-500': data.priority === 'Média',
    'bg-teal-500': data.priority === 'Baixa',
  })

  return (
    <Card className="max-h-52 p-4 flex flex-col gap-2 justify-center items-center">
      <CardHeader className="flex flex-row w-full py-1 px-0 items-center justify-between">
        <h3 className="max-w-44 font-semibold">
          {data.title !== '' ? (
            <span>Agendento</span>
          ) : (
            <span>{data.title}</span>
          )}
        </h3>
        <div className="space-x-2">
          <TooltipProvider>
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
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={`vehicles/`}>Ver detalhes</Link>
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
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex space-x-2">
          <span className="font-bold space-x-2 bg-slate-500/">Veiculo:</span>
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
}

export default ScheduleCard
