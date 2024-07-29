'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useFormState } from '@/hooks/use-form-state'
import { canceledScheduleMaintenanceActions } from './actions'
import { Toast } from '@/lib/toast'
import { format } from 'date-fns'
import { capitalizeFirstLetter } from '@/lib/utils'
import { ptBR } from 'date-fns/locale'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
} from '../ui/alert-dialog'

interface ScheduledCanceledFormProps {
  maintenanceId: string
  setShowCancelDialog: (show: boolean) => void
}

export function ScheduledCanceledForm({
  maintenanceId,
  setShowCancelDialog,
}: ScheduledCanceledFormProps) {
  const [{ message, success }, handleSubmit, isPending] = useFormState(
    canceledScheduleMaintenanceActions,
  )

  Toast({
    success,
    title: 'Cancelando agendamento',
    description: capitalizeFirstLetter(
      format(new Date(), 'PPPPp', { locale: ptBR }),
    ),
    onClose() {
      setShowCancelDialog(false)
    },
  })

  return (
    <AlertDialogContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="size-4" />
            <AlertTitle>Erro ao Cancelar Manutenção</AlertTitle>
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

          <div className="space-x-4">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <Button variant="destructive" type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Continuar '
              )}
            </Button>
          </div>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  )
}
