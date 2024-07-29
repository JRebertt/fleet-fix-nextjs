import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { Dialog, DialogTrigger } from '../ui/dialog'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import type { PaymentedProps as PaymentedTableRowProps } from '@/@types/types'
import { PaymentedDetails } from './paymented-details'
import { PaymentMethod } from './paymented-method'
import { PaymentedStatus } from './paymented-status'
import { PaymenteActions } from './paymented-actions-modal'

export function PaymentTableRow({ payment }: PaymentedTableRowProps) {
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
          <PaymentedDetails payment={payment} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {payment.id}
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {payment.maintenance.vehicle.licensePlate}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {payment.paymentDate
          ? format(payment.paymentDate, 'PPP', { locale: ptBR })
          : '--'}
      </TableCell>
      <TableCell>
        <PaymentedStatus status={payment.status} />
      </TableCell>
      <TableCell className="font-medium">{payment.description}</TableCell>
      <TableCell className="font-medium">
        {payment.paymentMethod ? (
          <PaymentMethod method={payment.paymentMethod} />
        ) : (
          '--'
        )}
      </TableCell>
      <TableCell className="font-medium">
        {payment.amount ? (
          payment.amount.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
        ) : (
          <span className="text-muted-foreground">--</span>
        )}
      </TableCell>
      <TableCell>
        <PaymenteActions payment={payment} />
      </TableCell>
    </TableRow>
  )
}
