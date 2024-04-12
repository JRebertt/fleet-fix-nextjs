/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { MaintenanceScheduleSchema } from '@/schemas/maintenance-schedule'
import deleteMaintenanceScheduleById from '@/services/maintenance-schedule/delete-maintenance-schedule-by-id'
import updateMaintenanceSchedule from '@/services/maintenance-schedule/update-maintenance-schedule'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { Vehicle } from '@/@types/vehicle-table'
import getVehicles from '@/services/vehicle/get-vehicles'
import { getMaintenanceScheduleById } from '@/services/maintenance-schedule/get-maintenance-schedule-by-id'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import notifications from '@/utils/ notifications'
import { useRouter } from 'next/navigation'
import { handleRemoveItem } from '@/lib/action-delete'

interface Props {
  id: string
}

type MaintenanceScheduleFormValues = z.infer<typeof MaintenanceScheduleSchema>

export function ActionsComponents({ id }: Props) {
  const [_, setVehicle] = useState<Vehicle[]>([])
  const [__, setSchedule] = useState<MaintenanceScheduleFormValues>()

  useEffect(() => {
    const fetchData = async () => {
      const scheduleList = await getMaintenanceScheduleById(id)
      const vehiclesList = await getVehicles()
      setVehicle(vehiclesList)
      setSchedule(scheduleList)
    }
    fetchData()
  }, [])

  const { mutateAsync: deleteMaintenanceScheduleFn } = useMutation({
    mutationFn: handleRemoveItem,
  })

  const form = useForm<MaintenanceScheduleFormValues>({
    resolver: zodResolver(MaintenanceScheduleSchema),
  })

  async function handlerEdit(values: MaintenanceScheduleFormValues) {
    console.log('Editado', id, values)

    await updateMaintenanceSchedule(id, values)
  }

  return (
    <div className="flex gap-2">
      <Button
        className="px-4"
        variant={'ghost'}
        onClick={() =>
          deleteMaintenanceScheduleFn({
            id,
            router: deleteMaintenanceScheduleById,
            notify: notifications.maintenance.delete,
          })
        }
        type="button"
      >
        <Trash size={16} />
      </Button>
      {/* 
      <Dialog>
        <DialogTrigger asChild>
          <button>
            <PenSquare size={16} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Item</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlerEdit)}
              className="grid gap-4 py-4"
            >
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
                              ? vehicle.find((data) => data.id === field.value)
                                  ?.model
                              : 'Carro'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[20rem] sm:w-[24rem] p-0">
                        <Command className="">
                          <CommandInput placeholder="Buscar Veiculo..." />
                          <CommandEmpty>
                            Nenhum Veiculo Encontrado.
                          </CommandEmpty>
                          <CommandGroup>
                            {vehicle.map((data) => (
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

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl onVolumeChange={(event) => console.log(event)}>
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
            </form>
          </Form>
        </DialogContent>
      </Dialog> */}
    </div>
  )
}
