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
import { Vehicle } from '@/@types/vehicle-table'
import deleteVehicleById from '@/services/vehicle/delete-vehicle-by-id'

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: 'model',
    header: 'Modelo',
  },
  // {
  //   accessorKey: 'make',
  //   header: 'Marca',
  // },
  {
    accessorKey: 'licensePlate',
    header: 'Placa',
  },
  {
    accessorKey: 'year',
    header: 'Ano',
  },
  {
    accessorKey: 'vin',
    header: 'Renavam',
  },
  // {
  //   accessorKey: 'driver_id',
  //   header: 'Motorista',
  // },
  // {
  //   accessorKey: 'company_id',
  //   header: 'Empresa',
  // },
  // {
  //   accessorKey: 'updatedAt',
  //   header: 'Ultima atualização',
  //   cell: ({ row }) => {
  //     const dateString = row.getValue('updatedAt') as string
  //     const dateObject = new Date(dateString)
  //     const formattedDateV2 = format(dateObject, 'dd/MM/yyyy HH:mm:ss')
  //     const formattedDate = formatDistanceToNow(dateObject, {
  //       addSuffix: true,
  //       locale: ptBR,
  //     })
  //     return (
  //       <TooltipProvider>
  //         <Tooltip>
  //           <TooltipTrigger>{formattedDate}</TooltipTrigger>
  //           <TooltipContent>
  //             <p>{formattedDateV2}</p>
  //           </TooltipContent>
  //         </Tooltip>
  //       </TooltipProvider>
  //     )
  //   },
  // },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      const vehicle = row.original

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
              <Link href={`vehicles/${vehicle.id}`}>Ver detalhes</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(`
                Modelo: ${vehicle.model}
                Placa: ${vehicle.licensePlate}
                `)
              }
            >
              Copiar informações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={() => deleteVehicleById(vehicle.id)}
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
