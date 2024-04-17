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
import { Driver } from '@/@types/driver-table'
import { deleteDriverById } from '@/services/driver/delete-driver-by-id'
import { Users } from '@/components/driver-form'
import { handleRemoveItem } from '@/lib/action-delete'
import notifications from '@/utils/ notifications'

interface DriversColmns extends Driver {
  user?: Users
  name?: string
}

export const columns: ColumnDef<DriversColmns>[] = [
  {
    accessorFn: (row) => {
      const driverName = row.user?.name
      return driverName
    },
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'cpf',
    header: 'CPF',
  },
  {
    accessorKey: 'licenseNumber',
    header: 'CNH',
  },
  {
    accessorKey: 'contact_number',
    header: 'Celular',
  },
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
      const driver = row.original

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
              <Link href={`driver/${driver.id}`}>Ver detalhes</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(`
                Nome do Motorista: ${driver.cpf}
                CPF: ${driver.cpf}
                Data de Nascimento: ${driver.birthDate}
                Contato: ${driver.contact_number}
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
                  id: driver.id,
                  router: deleteDriverById,
                  notify: notifications.driver.delete,
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
