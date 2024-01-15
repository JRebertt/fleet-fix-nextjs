'use client'

import { MaintenanceScheduleSchema } from '@/schemas/maintenance-schedule'
import createNewMaintenanceSchedule from '@/services/maintenance-schedule/create-new-maintenance-schedule'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

import getVehicles from '@/services/vehicle/get-vehicles'
import { Vehicle } from '@/@types/vehicle-table'
import { CalendarIcon } from '@radix-ui/react-icons'

import { toast } from 'sonner'
import { Calendar } from './ui/calendar'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type Priority = {
  name: 'Alta' | 'Média' | 'Baixa' | 'Normal'
  value: 'Alta' | 'Média' | 'Baixa' | 'Normal'
}

const priority: Priority[] = [
  {
    name: 'Normal',
    value: 'Normal',
  },
  {
    name: 'Alta',
    value: 'Alta',
  },
  {
    name: 'Baixa',
    value: 'Baixa',
  },
  {
    name: 'Média',
    value: 'Média',
  },
]

type ScheduleFormValues = z.infer<typeof MaintenanceScheduleSchema>

export default function ScheduleForm() {
  const [schedule, setSchedule] = useState<Vehicle[]>([])

  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(MaintenanceScheduleSchema),
    defaultValues: {
      status: 'Agendado',
      vehicleId: '',
      description: '',
      priority: 'Normal',
      scheduledDate: new Date(),
      statusChangeHistory: [
        {
          status: 'Agendado',
          changedAt: new Date().toISOString(),
          reason: 'Agendamento inicial',
        },
      ],
    },
  })

  async function onSubmit(values: ScheduleFormValues) {
    toast('Manutenção Agendada com sucesso!✅ ')

    await createNewMaintenanceSchedule(values)
  }

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
        {/* Campo Veiculo */}
        <FormField
          control={form.control}
          name="vehicleId"
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
                            form.setValue('vehicleId', data.id as string)
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

        {/* Campo Descrição */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Descrição"
                  {...field}
                  className="px-3 py-2"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          {/* Campo Data de Agendamento */}
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
                          'w-[12rem] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Pick a date</span>
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
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Prioridade */}
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Nivel de Prioridade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {priority.map((data, i) => (
                      <SelectItem key={i++} value={data.value}>
                        {data.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full" type="submit">
          Agendar
        </Button>
      </form>
    </Form>
  )
}
