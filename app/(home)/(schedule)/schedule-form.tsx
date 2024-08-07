'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../../components/ui/form'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'

import { Check, ChevronsUpDown, CalendarIcon } from 'lucide-react'

import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { Calendar } from '../../../components/ui/calendar'

import getVehicles from '@/services/vehicle/get-vehicles'
import { Vehicle } from '@/@types/vehicle-table'

import { MaintenanceScheduleSchema } from '@/schemas/maintenance-schedule'
import createNewMaintenanceSchedule from '@/services/maintenance-schedule/create-new-maintenance-schedule'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { Icons } from '@/components/icons'
import notifications from '@/utils/ notifications'

type ScheduleFormValues = z.infer<typeof MaintenanceScheduleSchema>

export default function ScheduleForm() {
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(MaintenanceScheduleSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'Scheduled',
      cost: null,
      startDate: null,
      endDate: null,
      scheduledDate: new Date(),
      vehicle_id: '',
    },
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

  const [schedule, setSchedule] = useState<Vehicle[]>([])
  // const [date, setDate] = React.useState(new Date())

  useEffect(() => {
    const fetchData = async () => {
      const vehiclesList = await getVehicles()
      setSchedule(vehiclesList)
    }
    fetchData()
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo Titulo */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Titulo" {...field} className="px-3 py-2" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ''}
                  placeholder="Descrição"
                  className="px-3 py-2"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Campo Veiculo */}
        <FormField
          control={form.control}
          name="vehicle_id"
          render={({ field }) => (
            <FormItem>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? schedule.find((data) => data.id === field.value)
                            ?.model
                        : 'Carro'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[20rem] sm:w-[24rem] p-0">
                  <Command className="">
                    <CommandInput placeholder="Buscar Motorista..." />
                    <CommandEmpty>Nenhum Motorista Encontrado.</CommandEmpty>
                    <CommandGroup>
                      {schedule.map((data) => (
                        <CommandItem
                          value={data.id}
                          key={data.id}
                          onSelect={() => {
                            form.setValue('vehicle_id', data.id as string)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              data.id === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {data.model}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scheduledDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP', {
                          locale: ptBR,
                        })
                      ) : (
                        <span>Escolha uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Agendar
        </Button>
      </form>
    </Form>
  )
}
