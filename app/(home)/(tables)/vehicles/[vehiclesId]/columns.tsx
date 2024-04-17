'use client'

import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

import { MoreHorizontal, Trash } from 'lucide-react'

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import deleteVehicleById from '@/services/vehicle/delete-vehicle-by-id'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'serviceType',
    header: 'Tipo',
  },
  {
    accessorKey: 'maintenanceDate',
    header: 'Manutenção',
    cell: ({ row }) => {
      const dateString = row.getValue('maintenanceDate') as string
      const dateObject = new Date(dateString)
      const formattedDateV2 = format(dateObject, 'dd/MM/yyyy')
      const formattedDate = formatDistanceToNow(dateObject, {
        addSuffix: true,
        locale: ptBR,
      })
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="text-center">
              {formattedDate}
            </TooltipTrigger>
            <TooltipContent>
              <p>{formattedDateV2}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
  {
    accessorKey: 'serviceCost',
    header: 'Custo',
    cell: ({ row }) => {
      const amount = parseFloat(row.original.serviceCost.toString())

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const maintenanceHistory = row.original

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
              <Link
                href={`vehicle/${maintenanceHistory.vehicleId}/maintenance-history/${maintenanceHistory.id}`}
              >
                Ver detalhes
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={() => deleteVehicleById(maintenanceHistory.id)}
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
