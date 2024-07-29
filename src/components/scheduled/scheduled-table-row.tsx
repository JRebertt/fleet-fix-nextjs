import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { Dialog, DialogTrigger } from '../ui/dialog'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import type { MaintenaceProps as ScheduledTableRowProps } from '@/@types/types'
import { ScheduledDetails } from './scheduled-details'
import { ScheduledStatus } from './scheduled-status'
import { MaintenanceActions } from './scheduled-actions-modal'

export function ScheduledTableRow({ maintenance }: ScheduledTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <ScheduledDetails maintenance={maintenance} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {maintenance.id}
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {maintenance.vehicle.licensePlate}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {format(maintenance.scheduledDate, 'PPP', { locale: ptBR })}
      </TableCell>
      <TableCell>
        <ScheduledStatus status={maintenance.status} />
      </TableCell>
      <TableCell className="font-medium">{maintenance.title}</TableCell>
      <TableCell className="font-medium">
        {maintenance.cost ? (
          maintenance.cost.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
        ) : (
          <span className="text-muted-foreground">--</span>
        )}
      </TableCell>
      <TableCell>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="xs">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36">
            <DropdownMenuGroup>
              <DropdownMenuItem disabled={!isScheduled && !isOnHold}>
                <Play className="mr-2 h-3 w-3" />
                <span>Iniciar</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled={!isInProgress}>
                <Check className="mr-2 h-3 w-3" />
                <span>Concluir</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={isCompleted || isCanceled || isFailed}
              >
                <X className="mr-2 h-3 w-3" />
                <span>Cancelar</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu> */}

        <MaintenanceActions
          maintenanceId={maintenance.id}
          status={maintenance.status}
        />
      </TableCell>
    </TableRow>
  )
}
