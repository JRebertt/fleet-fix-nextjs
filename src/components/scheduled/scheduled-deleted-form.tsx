'use client'

import { useFormState } from '@/hooks/use-form-state'
import { deleteScheduleMaintenanceActions } from './actions'
import { Button } from '../ui/button'

import { AlertTriangle, Loader2 } from 'lucide-react'

import { Toast } from '@/lib/toast'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { capitalizeFirstLetter } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
} from '../ui/alert-dialog'

interface ScheduledDeletedFormProps {
  maintenanceId: string
  setShowDeleteDialog: (show: boolean) => void
}

export function ScheduledDeletedForm({
  maintenanceId,
  setShowDeleteDialog,
}: ScheduledDeletedFormProps) {
  const [{ message, success }, handleSubmit, isPending] = useFormState(
    deleteScheduleMaintenanceActions,
  )

  Toast({
    success,
    title: 'Deletando agendamento',
    description: capitalizeFirstLetter(
      format(new Date(), 'PPPPp', { locale: ptBR }),
    ),
    onClose() {
      setShowDeleteDialog(false)
    },
  })

  return (
    <AlertDialogContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="size-4" />
            <AlertTitle>Erro ao Deletar Manutenção</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Este agendamento não estará mais
            acessível por você ou para outros.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <input
            type="hidden"
            id="maintenanceId"
            name="maintenanceId"
            value={maintenanceId}
          />
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <Button
            type="submit"
            variant="destructive"
            onClick={() => {
              setShowDeleteDialog(false)
            }}
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Apagar'}
          </Button>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  )
}
