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
import { Company } from '@/@types/company-table'
import { deleteCompanyById } from '@/services/company/delete-company-by-id'
import notifications from '@/utils/ notifications'
import { handleRemoveItem } from '@/lib/action-delete'

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: 'name',
    header: 'Empresa',
  },
  {
    accessorKey: 'cnpj',
    header: 'CNPJ',
  },
  // {
  //   accessorKey: '',
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
      const company = row.original

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
              <Link href={`companys/${company.id}`}>Ver detalhes</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(`
                Nome da Empresa: ${company.name}
                CNPJ: ${company.cnpj}
                Email Corporativo: ${company.contact_email}
                Telefone: ${company.contact_number}
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
                  id: company.id,
                  router: deleteCompanyById,
                  notify: notifications.company.delete,
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
