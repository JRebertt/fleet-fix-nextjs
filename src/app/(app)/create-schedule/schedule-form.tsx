'use client'

import { Button } from '@/components/ui/button'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { Input } from '@/components/ui/input'

import { AlertTriangle, Loader2 } from 'lucide-react'

import { useFormState } from '@/hooks/use-form-state'
import { createScheduleMaintenanceAction } from './actions'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

import VehicleSwitcher from '@/components/vehicle-switcher'
import { useVehicles } from '@/hooks/use-vehicles-selector'
import { DateTimePicker } from '@/components/date-time-picker'
import { useDateTimePicker } from '@/hooks/use-date-time-picker'
import { useRouter } from 'next/navigation'

export default function ScheduledForm() {
  const router = useRouter()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    createScheduleMaintenanceAction,
    () => {
      router.push('/scheduled')
    },
  )

  const { handleDateChange } = useDateTimePicker(new Date())

  const { vehicles } = useVehicles()

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Falha ao Salvar Agendamento</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        {success === true && message && (
          <Alert variant="success">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sucesso!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="title">Título</Label>
          <Input name="title" id="title" />
          {errors?.title && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.title[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            name="description"
            id="description"
            className="mb-4 w-full resize-none px-3 py-2"
          />

          {errors?.description && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.description[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="space-y-1">
            <Label htmlFor="vehicleId">Selecione um Veículo</Label>
            <VehicleSwitcher
              id="vehicleId"
              name="vehicleId"
              vehicles={vehicles}
            />

            {errors?.vehicleId && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.vehicleId[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="date">Selecione uma Data</Label>

            <DateTimePicker
              id="scheduledDate"
              name="scheduledDate"
              defaultValue={new Date()}
              onChange={handleDateChange}
              includeTime={false}
            />

            {/* FIXME: Ajustar DateTimePicker para não receber uma data default e sim um botao em branco por exemplo */}

            {errors?.date && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.date[0]}
              </p>
            )}
          </div>
        </div>

        <Button
          className="w-full rounded p-3"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Agendar'
          )}
        </Button>
      </form>
    </div>
  )
}
