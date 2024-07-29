import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { PaymentedStatus } from './paymented-status'
import { PaymentMethod } from './paymented-method'
import type { PaymentedProps as PaymentedDetailsProps } from '@/@types/types'

export function PaymentedDetails({ payment }: PaymentedDetailsProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pagamento: {payment.id}</DialogTitle>
        <DialogDescription>Detalhes do pagamento</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <PaymentedStatus status={payment.status} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Forma de pagamento
              </TableCell>
              <TableCell className="flex justify-end">
                {payment.paymentMethod ? (
                  <PaymentMethod method={payment.paymentMethod} />
                ) : (
                  '--'
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Placa</TableCell>
              <TableCell className="flex justify-end">
                {payment.maintenance.vehicle.licensePlate}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Data de Agendamento
              </TableCell>
              <TableCell className="flex justify-end">
                {payment.paymentDate
                  ? format(payment.paymentDate, 'PPPP', { locale: ptBR })
                  : '--'}
              </TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell className="text-muted-foreground">Duração</TableCell>
              <TableCell className="flex justify-end text-muted-foreground">
                {payment.status === 'Completed' ? formattedDuration : '--'}
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
