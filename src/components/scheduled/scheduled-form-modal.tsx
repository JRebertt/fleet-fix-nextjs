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
import { startScheduleMaintenanceActions } from './actions'
import { Label } from '../ui/label'
import { useDateTimePicker } from '@/hooks/use-date-time-picker'
import { DateTimePicker } from '../date-time-picker'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Toast } from '@/lib/toast'

interface ScheduledFormModalProps {
  setIsOpen: (isOpen: boolean) => void
  maintenanceId: string
}

export function ScheduledFormModal({
  setIsOpen,
  maintenanceId,
}: ScheduledFormModalProps) {
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    startScheduleMaintenanceActions,
  )
  const { handleDateChange } = useDateTimePicker(new Date())

  Toast({
    success,
    title: 'Manutenção Iniciada',
    description: 'A manutenção foi iniciada com sucesso.',
  })

  return (
    <DialogContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="size-4" />
            <AlertTitle>Erro ao Iniciar Manutenção</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <DialogHeader>
          <DialogTitle>Iniciar Manutenção</DialogTitle>
          <DialogDescription className="text-wrap">
            Selecione a data e hora para iniciar a manutenção do veículo. Por
            favor, certifique-se de que a data de início é posterior à data de
            agendamento .
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          {/* <h4 className="text-sm text-muted-foreground">Avisos do Playground</h4>
        <div className="flex items-start justify-between space-x-4 pt-3">
          <Switch name="show" id="show" defaultChecked={true} />
          <Label className="grid gap-1 font-normal" htmlFor="show">
            <span className="font-semibold">
              Mostrar um aviso quando o conteúdo for sinalizado
            </span>
            <span className="text-sm text-muted-foreground">
              Um aviso será exibido quando conteúdo sexual, odioso, violento ou
              de auto-mutilação for detectado.
            </span>
          </Label>
        </div> */}

          <div className="space-y-1">
            <Label htmlFor="date">Selecione uma Data</Label>

            <DateTimePicker
              id="scheduledStartDate"
              name="scheduledStartDate"
              defaultValue={new Date()}
              onChange={handleDateChange}
              includeTime={true}
            />

            {errors?.name && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.name[0]}
              </p>
            )}

            <input
              type="hidden"
              id="maintenanceId"
              name="maintenanceId"
              value={maintenanceId}
            />
          </div>
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
