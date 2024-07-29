'use client'

import * as React from 'react'

import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Check, Ellipsis, Play, Trash2, X } from 'lucide-react'
import { ScheduledFormModal } from './scheduled-form-modal'
import { ScheduledCanceledForm } from './scheduled-canceled-form'
import { ScheduledDeletedForm } from './scheduled-deleted-form'

type MaintenanceStatus =
  | 'Completed'
  | 'Canceled'
  | 'InProgress'
  | 'Scheduled'
  | 'OnHold'
  | 'Failed'

interface MaintenanceActionsProps {
  status: MaintenanceStatus
  maintenanceId: string
}

export function MaintenanceActions({
  status,
  maintenanceId,
}: MaintenanceActionsProps) {
  const [open, setIsOpen] = React.useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [showCanceledDialog, setShowCanceledialog] = React.useState(false)

  const isCompleted = status === 'Completed'
  const isCanceled = status === 'Canceled'
  const isInProgress = status === 'InProgress'
  const isScheduled = status === 'Scheduled'
  const isOnHold = status === 'OnHold'
  const isFailed = status === 'Failed'

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="xs">
            <span className="sr-only">Actions</span>
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => setIsOpen(true)}
            disabled={!isScheduled && !isOnHold}
          >
            <Play className="mr-2 h-3 w-3" />
            <span>Iniciar</span>
          </DropdownMenuItem>

          <DropdownMenuItem disabled={!isInProgress}>
            <Check className="mr-2 h-3 w-3" />
            <span>Concluir</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={isCompleted || isCanceled || isFailed}
            onSelect={() => setShowCanceledialog(true)}
          >
            <X className="mr-2 h-3 w-3" />
            <span>Cancelar</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-3 w-3" />
            <span>Apagar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setIsOpen}>
        <ScheduledFormModal
          maintenanceId={maintenanceId}
          setIsOpen={setIsOpen}
        />
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <ScheduledDeletedForm
          maintenanceId={maintenanceId}
          setShowDeleteDialog={setShowDeleteDialog}
        />
      </AlertDialog>

      <AlertDialog
        open={showCanceledDialog}
        onOpenChange={setShowCanceledialog}
      >
        <ScheduledCanceledForm
          maintenanceId={maintenanceId}
          setShowCancelDialog={setShowCanceledialog}
        />
      </AlertDialog>
    </>
  )
}
