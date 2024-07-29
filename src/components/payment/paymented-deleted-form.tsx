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
import { deletePaymentActions } from './actions'

interface PaymentDeletedFormProps {
  paymentId: string
  setShowDeleteDialog: (show: boolean) => void
}

export function PaymentedDeletedForm({
  paymentId,
  setShowDeleteDialog,
}: PaymentDeletedFormProps) {
  const [{ message, success }, handleSubmit, isPending] =
    useFormState(deletePaymentActions)

  Toast({
    success,
    title: 'Deletando pagamento',
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
            <AlertTitle>Erro ao Deletar Pagamento</AlertTitle>
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
            id="paymentId"
            name="paymentId"
            value={paymentId}
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
