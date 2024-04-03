/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { MaintenanceSchedule } from '@/@types/maintenance-table'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { MaintenanceScheduleSchema } from '@/schemas/maintenance-schedule'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import getVehicles from '@/services/vehicle/get-vehicles'
import { Vehicle } from '@/@types/vehicle-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import startMaintenanceSchedule from '@/services/maintenance-schedule/start-maintenance-schedule'
import completeMaintenanceSchedule from '@/services/maintenance-schedule/complete-maintenance-schedule'

const StarteMaintenanceScheduleSchema = MaintenanceScheduleSchema.pick({
  startDate: true,
})

type StartMaintenanceScheduleFormsValues = z.infer<
  typeof StarteMaintenanceScheduleSchema
>

const RequestCompleteMaintenanceSchema = z.object({
  endDate: z.coerce.date(),
  cost: z.coerce.number(),
})

type RequestCompleteMaintenanceFormsValues = z.infer<
  typeof RequestCompleteMaintenanceSchema
>

export function ButtonStart({ value }: { value: MaintenanceSchedule }) {
  const [_, setSchedule] = useState<Vehicle[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const scheduleList = await getVehicles()
      setSchedule(scheduleList)
    }
    fetchData()
  }, [])

  const form = useForm<StartMaintenanceScheduleFormsValues>({
    resolver: zodResolver(StarteMaintenanceScheduleSchema),
    defaultValues: {
      startDate: new Date(),
    },
  })

  const formEnd = useForm<RequestCompleteMaintenanceFormsValues>({
    resolver: zodResolver(RequestCompleteMaintenanceSchema),
    defaultValues: {
      endDate: new Date(),
      cost: 0,
    },
  })

  async function onSubmit({ startDate }: StartMaintenanceScheduleFormsValues) {
    form.reset()

    if (startDate === null) {
      return new Date()
    }

    await startMaintenanceSchedule(value.id, startDate)
  }

  async function onSubmitEnd({
    endDate,
    cost,
  }: RequestCompleteMaintenanceFormsValues) {
    toast('Manutenção finalizada sucesso!✅ ')

    await completeMaintenanceSchedule(value.id, endDate, cost)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {value.status === 'Scheduled' ? (
          <Button variant="blue" className="w-full">
            Iniciar
          </Button>
        ) : (
          <Button variant="default" className="w-full">
            Concluir
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Item</DialogTitle>
          <DialogDescription>Preencha as informações abaixo.</DialogDescription>
        </DialogHeader>
        {value.status === 'Scheduled' ? (
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="startDate"
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
                            selected={field.value ?? new Date()}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full" type="submit">
                  Confirmar
                </Button>
              </form>
            </Form>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <Form {...formEnd}>
              <form
                onSubmit={formEnd.handleSubmit(onSubmitEnd)}
                className="space-y-6"
              >
                <FormField
                  control={formEnd.control}
                  name="endDate"
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
                            selected={field.value ?? new Date()}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formEnd.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Valor do Serviço"
                          {...field}
                          className="px-3 py-2"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">
                  Confirmar
                </Button>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
