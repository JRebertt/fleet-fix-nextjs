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

import { MaintenanceSchedule } from '@/@types/maintenance.table'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import React, { useEffect, useState } from 'react'
import { MaintenanceScheduleSchema } from '@/schemas/maintenance-schedule'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import getVehicles from '@/services/vehicle/get-vehicles'
import { Vehicle } from '@/@types/vehicle-table'
import { Textarea } from '@/components/ui/textarea'
import updateMaintenanceSchedule from '@/services/maintenance-schedule/update-maintenance-schedule'
import { useHookFormMask } from 'use-mask-input'

const StarteMaintenanceScheduleSchema = MaintenanceScheduleSchema.pick({
  vehicleId: true,
  workshopId: true,
  status: true,
  mechanicAssigned: true,
  statusChangeHistory: true,
  feedback: true,
  maintenanceCost: true,
  payment: true,
})

type MaintenanceScheduleFormsValues = z.infer<
  typeof StarteMaintenanceScheduleSchema
>

export function ButtonStart({ value }: { value: MaintenanceSchedule }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [schedule, setSchedule] = useState<Vehicle[]>([])

  const form = useForm<MaintenanceScheduleFormsValues>({
    resolver: zodResolver(StarteMaintenanceScheduleSchema),
    defaultValues: {
      feedback: '',
      mechanicAssigned: '',
      workshopId: '',
      vehicleId: value.vehicleId,
      status: value.status === 'Agendado' ? 'Em Manutenção' : 'Concluído',
      statusChangeHistory: [
        ...value.statusChangeHistory,
        {
          changedAt: new Date().toDateString(),
          reason:
            value.status === 'Agendado'
              ? 'Manutenção iniciada'
              : 'Manutenção concluída',
          status: value.status === 'Agendado' ? 'Em Manutenção' : 'Concluído',
        },
      ],
      payment: {
        amount: '',
      },
    },
  })

  const masked = useHookFormMask(form.register)

  async function onSubmit(values: MaintenanceScheduleFormsValues) {
    toast('Manutenção iniciada sucesso!✅ ')
    form.reset()
    setIsOpen(false)
    const data = {
      ...value,
      ...values,
    }
    await updateMaintenanceSchedule(value.id as string, data)
  }

  useEffect(() => {
    const fetchData = async () => {
      const vehiclesList = await getVehicles()
      setSchedule(vehiclesList)
    }
    fetchData()
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {value.status === 'Agendado' ? (
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
        {value.status === 'Agendado' ? (
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="mechanicAssigned"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Nome do Mecanico"
                          {...field}
                          className="px-3 py-2"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Campo Veiculo */}
                <FormField
                  control={form.control}
                  name="workshopId"
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
                                ? schedule.find(
                                    (data) => data.id === field.value,
                                  )?.model
                                : 'Carro'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[20rem] sm:w-[24rem] p-0">
                          <Command className="">
                            <CommandInput placeholder="Buscar Motorista..." />
                            <CommandEmpty>
                              Nenhum Motorista Encontrado.
                            </CommandEmpty>
                            <CommandGroup>
                              {schedule.map((data) => (
                                <CommandItem
                                  value={data.id}
                                  key={data.id}
                                  onSelect={() => {
                                    form.setValue(
                                      'workshopId',
                                      data.id as string,
                                    )
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

                <Button className="w-full" type="submit">
                  Confirmar
                </Button>
              </form>
            </Form>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="payment.amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Valor do Serviço"
                          {...field}
                          {...masked('payment.amount', 'integer', {
                            prefix: 'R$',
                          })}
                          className="px-3 py-2 text-right"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Observações"
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
