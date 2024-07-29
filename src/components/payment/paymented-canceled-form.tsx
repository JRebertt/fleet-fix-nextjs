'use client'

import { useFormState } from '@/hooks/use-form-state'
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
import { canceledPaymentActions } from './actions'

interface PaymentedCanceledFormProps {
  setShowCancelDialog: (show: boolean) => void
  payment: any
}

export function PaymentedCanceledForm({
  payment,
  setShowCancelDialog,
}: PaymentedCanceledFormProps) {
  const [{ message, success }, handleSubmit, isPending] = useFormState(
    canceledPaymentActions,
  )

  Toast({
    success,
    title: 'Cancelando pagamento',
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
            <AlertTitle>Erro ao Cancelar Pagamento</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Este pagamento não estará mais
            acessível por você ou para outros.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <input
            type="hidden"
            id="payment"
            name="payment"
            value={JSON.stringify(payment)}
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
