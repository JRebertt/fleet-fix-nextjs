'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'

import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { MaintenanceScheduleSchema } from '@/schemas/maintenance-schedule'
import createNewMaintenanceSchedule from '@/services/maintenance-schedule/create-new-maintenance-schedule'
import getVehicles from '@/services/vehicle/get-vehicles'
import notifications from '@/utils/ notifications'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ArrowLeft, CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import { z } from 'zod'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { TimePicker } from '@/components/ui/time-picker'
import { ptBR } from 'date-fns/locale'
import { Icons } from '@/components/icons'

import Link from 'next/link'

type ScheduleFormValues = z.infer<typeof MaintenanceScheduleSchema>

export default function RegisterMaintenance() {
  const defaultDate = new Date()

  const { register, handleSubmit, control, setValue, formState } =
    useForm<ScheduleFormValues>({
      defaultValues: {
        title: '',
        description: '',
        status: 'Scheduled',
        cost: null,
        startDate: null,
        endDate: null,
        scheduledDate: defaultDate,
        vehicle_id: '',
      },
    })

  const { data: vehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => await getVehicles(),
  })

  const { mutateAsync: createMaintenanceSchedule } = useMutation({
    mutationFn: createNewMaintenanceSchedule,
  })

  async function onSubmit(values: ScheduleFormValues) {
    try {
      toast.success(notifications.maintenance.schedule.success)
      await createMaintenanceSchedule(values)
    } catch (err) {
      toast.error(notifications.maintenance.schedule.error)
    }
  }

  return (
    <div>
      <Link href={'/?status=Scheduled'}>
        <ArrowLeft className="ml-32" />
      </Link>

      <section className="flex h-full justify-center items-center p-4">
        <Toaster />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl p-6 "
        >
          <h1 className="text-lg font-bold mb-4">Agendar Manutenção</h1>
          <Input
            placeholder="Título"
            {...register('title')}
            className="px-3 py-2 w-full mb-4"
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                value={field.value ?? ''}
                placeholder="Descrição"
                className="px-3 py-2 w-full mb-4 resize-none"
              />
            )}
          />

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Controller
              name="vehicle_id"
              control={control}
              render={({ field: { name, onChange, value, disabled } }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      name={name}
                      disabled={disabled}
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {value
                        ? vehicles?.find((vehicle) => vehicle.id === value)
                            ?.model
                        : 'Selecione um veículo...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Pesquisar..." />
                      <CommandEmpty>Nenhum veículo encontrado.</CommandEmpty>
                      <CommandGroup>
                        {vehicles?.map((vehicle) => (
                          <CommandItem
                            key={vehicle.id}
                            value={vehicle.id}
                            onSelect={() => {
                              const newValue =
                                vehicle.id === value ? '' : vehicle.id
                              onChange(newValue) // Aqui passamos o newValue diretamente para onChange
                              setValue('vehicle_id', newValue)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                value === vehicle.id
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {vehicle.model}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            />

            <Controller
              name="scheduledDate"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {field.value
                        ? format(field.value, 'PPP HH:mm:ss', { locale: ptBR })
                        : 'Selecione uma data'}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={field.value || defaultDate}
                      onSelect={(date) => {
                        if (date) {
                          setValue('scheduledDate', date)
                          field.onChange(date)
                        }
                      }}
                    />
                    <TimePicker
                      date={field.value || defaultDate}
                      setDate={(date) => {
                        if (date) {
                          setValue('scheduledDate', date)
                          field.onChange(date)
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>

          <Button
            className="w-full p-3 rounded"
            type="submit"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Agendar
          </Button>
        </form>
      </section>
    </div>
  )
}
