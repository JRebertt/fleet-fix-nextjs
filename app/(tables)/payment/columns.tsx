'use client'

import { z } from 'zod'
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

import deleteVehicleById from '@/services/vehicle/delete-vehicle-by-id'

import { PaymentSchemas } from '@/schemas/payment'
import updatePayments from '@/services/payment/update-payment'

type PaymentSchemasValues = z.infer<typeof PaymentSchemas>

export const columns: ColumnDef<PaymentSchemasValues>[] = [
  {
    accessorFn: (row) => {
      const { id } = row.maintenanceSchedule

      return id
    },
    accessorKey: 'maintenanceId',
    header: 'Manutenção',
  },
  {
    accessorFn: (row) => {
      const { model } = row.vehicle

      return model
    },
    accessorKey: 'model',
    header: 'Veiculo',
  },

  {
    accessorFn: (row) => {
      const { paymentStatus } = row.payment

      return paymentStatus
    },
    accessorKey: 'paymentStatus',
    cell: ({ row }) => {
      const status = row.getValue('paymentStatus') as string

      return (
        <div className="flex items-center">
          <span
            className={`h-2 w-2 rounded-full mr-2 ${
              status === 'Pago' ? 'bg-green-500' : 'bg-yellow-500'
            }`}
          />
          {status}
        </div>
      )
    },
    header: 'Status',
  },
  {
    accessorFn: (row) => {
      const { amount } = row.payment
      const numericAmount = Number(amount) || 0

      // Formatação para a moeda brasileira
      return numericAmount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    },
    header: 'Pagamento',
  },
  {
    accessorFn: (row) => {
      const { paymentMethod } = row.payment

      return paymentMethod
    },
    cell: ({ row }) => {
      const method = row.getValue('paymentMethod') as string

      return <p className="text-sm text-muted-foreground">{method}</p>
    },
    accessorKey: 'paymentMethod',
    header: 'Forma de Pagemento',
  },
  {
    accessorKey: 'paymentStatusAction',
    header: '',
    cell: ({ row }) => {
      const data = row.original

      return (
        <Button
          className="h-8"
          variant="outline"
          onClick={() =>
            updatePayments(data.id as string, {
              payment: {
                paymentStatus: 'Pago',
              },
            })
          }
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
                Modelo: ${payment.payment.amount}
                Modelo: ${payment.payment.paymentMethod}
                Modelo: ${payment.payment.paymentStatus}
                Modelo: ${payment.payment.paymentedDate}
                Modelo: ${payment.id}
                `)
              }
            >
              Copiar informações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={() => deleteVehicleById(payment.id)}
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
