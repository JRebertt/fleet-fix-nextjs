'use client'

import * as React from 'react'

import {
  Check,
  Ellipsis,
  FilePen,
  Handshake,
  PlusCircle,
  Trash,
  X,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { AlertDialog } from '../ui/alert-dialog'

import { PaymentedCanceledForm } from './paymented-canceled-form'
import type { PaymentedProps as PaymentedPaymentActionsProps } from '@/@types/types'
import { PaymentedDeletedForm } from './paymented-deleted-form'
import { Dialog } from '../ui/dialog'
import { PaymentFormModal } from './paymented-completed-form'

export function PaymenteActions({ payment }: PaymentedPaymentActionsProps) {
  const { id, status } = payment
  const [open, setIsOpen] = React.useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [showCanceledDialog, setShowCanceledialog] = React.useState(false)

  const isCompleted = status === 'Completed'
  const isCanceled = status === 'Canceled'
  const isInProcess = status === 'InProcess'
  const isPending = status === 'Pending'
  // const isOnHold = status === 'OnHold'
  const isFailed = status === 'Failed'

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="xs">
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-36">
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Handshake className="mr-2 h-3 w-3" />
                <span>Ação</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    disabled={!(isPending || isInProcess)}
                    onSelect={() => setIsOpen(true)}
                  >
                    <Check className="mr-2 h-3 w-3" />
                    <span>Concluir</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={isCanceled || isCompleted || isFailed}
                    onSelect={() => setShowCanceledialog(true)}
                  >
                    <X className="mr-2 h-3 w-3" />
                    <span>Cancelar</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem disabled>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Mais...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem disabled>
              <FilePen className="mr-2 h-3 w-3" />
              <span>Editar</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={() => setShowDeleteDialog(true)}
              className="text-red-600"
            >
              <Trash className="mr-2 h-3 w-3" />
              <span>Apagar</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setIsOpen}>
        <PaymentFormModal payment={payment} setIsOpen={setIsOpen} />
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <PaymentedDeletedForm
          paymentId={id}
          setShowDeleteDialog={setShowDeleteDialog}
        />
      </AlertDialog>

      <AlertDialog
        open={showCanceledDialog}
        onOpenChange={setShowCanceledialog}
      >
        <PaymentedCanceledForm
          payment={payment}
          setShowCancelDialog={setShowCanceledialog}
        />
      </AlertDialog>
    </>
  )
}
