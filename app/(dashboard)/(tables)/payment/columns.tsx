'use client'

import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

import { Check, MoreHorizontal, Trash } from 'lucide-react'

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

import { Payment } from '@/@types/payment'
import { PaymentStatusDisplay } from '@/components/payment-status'
import { PaymentMethodDisplay } from '@/components/payment-method'
import completePayment from '@/services/payment/complete-payment'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { formatDates } from '@/lib/formtDate'
import deletePaymentById from '@/services/payment/delete-payment-by-id'
import { handleRemoveItem } from '@/lib/action-delete'
import notifications from '@/utils/ notifications'

interface PaymentColum extends Payment {
  maintenanceTitle?: string
  licensePlate?: string
}

export const columns: ColumnDef<PaymentColum>[] = [
  {
    accessorFn: (row) => {
      const { id } = row

      return id
    },
    accessorKey: 'id',
    header: 'id',
  },
  // {
  //   cell: async ({ row }) => {
  //     const payment = row.original

  //     const { vehicle_id: vehicleId } = await getMaintenanceScheduleById(
  //       payment.maintenance_id,
  //     )

  //     const { licensePlate } = await getVehicleById(vehicleId)

  //     return <p>{licensePlate}</p>
  //   },
  //   accessorKey: 'licensePlate',
  //   header: 'Veiculo',
  // },
  // {
  //   cell: async ({ row }) => {
  //     const payment = row.original

  //     const { title } = await getMaintenanceScheduleById(payment.maintenance_id)

  //     return <p>{title}</p>
  //   },
  //   accessorKey: 'maintenanceTitle',
  //   header: 'Manutenção',
  // },
  {
    accessorFn: (row) => {
      const { status } = row

      return status
    },
    accessorKey: 'status',
    cell: ({ row }) => {
      const status = row.getValue('status') as
        | 'Pending'
        | 'Completed'
        | 'Canceled'
        | 'Failed'
        | 'InProcess'
        | 'OnHold'

      return <PaymentStatusDisplay status={status} />
    },
    header: 'Status',
  },
  {
    accessorFn: (row) => {
      const { amount } = row
      const numericAmount = Number(amount) || 0

      // Formatação para a moeda brasileira
      return numericAmount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    },
    header: 'Pagamento',
    accessorKey: 'amount',
  },
  {
    cell: ({ row }) => {
      const data = row.original

      if (data.paymentDate === null) {
        return <span>Não encontrado</span>
      }

      const { formattedDate: simpleCreatedAt, timeUntilNow: detailsCreatedAt } =
        formatDates(data.paymentDate, {
          formatDate: 'dd/MM/yyyy HH:mm:ss',
        })

      return (
        <div className="w-full flex justify-between items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{detailsCreatedAt}</TooltipTrigger>
              <TooltipContent>
                <p>{simpleCreatedAt}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    },
    accessorKey: 'paymentDate',
    header: 'Data de Pagamento',
  },
  {
    accessorFn: (row) => {
      const { paymentMethod } = row

      return paymentMethod
    },
    cell: ({ row }) => {
      const method = row.getValue('paymentMethod') as
        | 'Card'
        | 'Boleto'
        | 'Transfer'
        | 'Cash'
        | 'Pix'

      return <PaymentMethodDisplay method={method} />
    },
    accessorKey: 'paymentMethod',
    header: 'Forma de Pagemento',
  },
  {
    accessorKey: 'paymentStatusAction',
    header: '',
    cell: ({ row }) => {
      const data = row.original

      return data.status === 'Completed' ? (
        <span></span>
      ) : (
        <Button
          className="h-8"
          variant="outline"
          onClick={() => completePayment(data.id, new Date(), 'Pix')}
        >
          <div className="flex justify-center items-center gap-2">
            <Check size={16} />
            <span>Pagar</span>
          </div>
        </Button>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      const payment = row.original

      return (
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
              <Link href={`vehicles/${payment.id}`}>Ver detalhes</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(`
                Valor do serviço: ${payment.amount}
                Metodo de pagemento: ${payment.paymentMethod}
                Status: ${payment.status}
                Data do pagamento: ${payment.paymentDate}
                Id da manutenção: ${payment.maintenance_id}
                `)
              }
            >
              Copiar informações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={() =>
                handleRemoveItem({
                  id: payment.id,
                  router: deletePaymentById,
                  notify: notifications.payment.delete,
                })
              }
            >
              Delete
              <DropdownMenuShortcut>
                <Trash size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
