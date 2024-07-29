import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { format, intervalToDuration } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { MaintenaceProps as ScheduledDetailsProps } from '@/@types/types'
import { ScheduledStatus } from './scheduled-status'

export function ScheduledDetails({ maintenance }: ScheduledDetailsProps) {
  const duration = intervalToDuration({
    start: new Date(maintenance.startDate),
    end: new Date(maintenance.endDate),
  })

  const formattedDuration = `${duration.days} dia${duration.days !== 1 ? 's' : ''} e ${duration.hours} hora${duration.hours !== 1 ? 's' : ''}`

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Agendamento: {maintenance.id}</DialogTitle>
        <DialogDescription>Detalhes do agendado</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <ScheduledStatus status={maintenance.status} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Modelo</TableCell>
              <TableCell className="flex justify-end">
                {maintenance.vehicle.model}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Placa</TableCell>
              <TableCell className="flex justify-end">
                {maintenance.vehicle.licensePlate}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Data de Agendamento
              </TableCell>
              <TableCell className="flex justify-end">
                {format(maintenance.scheduledDate, 'PPPP', { locale: ptBR })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Duração</TableCell>
              <TableCell className="flex justify-end text-muted-foreground">
                {maintenance.status === 'Completed' ? formattedDuration : '--'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
