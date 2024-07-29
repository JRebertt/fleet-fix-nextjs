'use client'

import { useFormState } from '@/hooks/use-form-state'

import { Button } from '../ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Label } from '../ui/label'
import { useDateTimePicker } from '@/hooks/use-date-time-picker'
import { DateTimePicker } from '../date-time-picker'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Toast } from '@/lib/toast'
import { completedPaymentActions } from './actions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import type {
  MaintenaceProps,
  PaymentedStatus,
  PaymentMethod,
} from '@/@types/types'

interface PaymentFormModalProps {
  setIsOpen: (isOpen: boolean) => void
  payment: {
    id: string
    amount: number
    description: string | null
    paymentDate: Date | null
    paymentMethod: PaymentMethod | null
    status: PaymentedStatus
    maintenance_id: string | null
    created_at: Date
    updated_at: Date
    maintenance?: MaintenaceProps
  }
}

export function PaymentFormModal({
  setIsOpen,
  payment,
}: PaymentFormModalProps) {
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    completedPaymentActions,
  )
  const { handleDateChange } = useDateTimePicker(new Date())

  Toast({
    success,
    title: 'Pagamento Completo',
    description: 'O pagamento foi completado com sucesso.',
  })

  return (
    <DialogContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="size-4" />
            <AlertTitle>Erro ao Completar Pagamento</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <DialogHeader>
          <DialogTitle>Completar Pagamento</DialogTitle>
          <DialogDescription className="text-wrap">
            Selecione a data e hora para completar o pagamento. Por favor,
            certifique-se de que a data de pagamento é válida.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1 py-6">
          <div className="flex items-center justify-center gap-4">
            <span className="space-y-1">
              <Label htmlFor="paymentDate">Selecione uma Data</Label>

              <DateTimePicker
                id="paymentDate"
                name="paymentDate"
                defaultValue={new Date()}
                onChange={handleDateChange}
                includeTime={true}
              />

              {errors?.name && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.name[0]}
                </p>
              )}
            </span>

            <span className="space-y-1">
              <Label htmlFor="paymentMethod">Método de Pagamento</Label>

              <Select
                name="paymentMethod"
                defaultValue={payment.paymentMethod ?? 'Selecione'}
              >
                <SelectTrigger className="h-10 w-[180px]" id="paymentMethod">
                  <SelectValue placeholder="Selecione o Método de Pagamento" />
                </SelectTrigger>
                <SelectContent id="paymentMethod">
                  <SelectItem value="Boleto">Boleto</SelectItem>
                  <SelectItem value="Transfer">Transferência</SelectItem>
                  <SelectItem value="Card">Cartão</SelectItem>
                  <SelectItem value="Cash">Dinheiro</SelectItem>
                  <SelectItem value="Pix">Pix</SelectItem>
                </SelectContent>
              </Select>

              {errors?.name && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.name[0]}
                </p>
              )}
            </span>
          </div>

          <input type="hidden" id="payment" name="payment" value={payment.id} />
        </div>

        <DialogFooter>
          <Button
            variant="default"
            type="submit"
            className="w-20"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Salvar'}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Fechar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
