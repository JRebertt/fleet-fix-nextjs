/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import getVehicles from '@/services/vehicle/get-vehicles'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { parseAsIsoDateTime, useQueryState } from 'nuqs'
import { Button } from '@/components/ui/button'
import { Filter, X, Plus } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { DatePickerWithRange } from './date-range-picker'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ScheduleForm from './schedule-form'
import { format } from 'date-fns'

const filterSchema = z.object({
  title: z.string().optional(),
  status: z.string().optional(),
  vehicle: z.string().optional(),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
})

type FilterSchemaType = z.infer<typeof filterSchema>

export function Filters() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const hasNoParams = params.toString() === ''

  const [title, setTitle] = useQueryState('title', {
    defaultValue: '',
  })
  const [_, setTo] = useQueryState('endDate')
  const [__, setFrom] = useQueryState('startDate')
  const [status, setStatus] = useQueryState('status', { defaultValue: 'all' })
  const [vehicle, setVehicle] = useQueryState('vehicle', {
    defaultValue: 'all vehicles',
  })

  const { data: vehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => await getVehicles(),
  })

  const { register, handleSubmit, control, reset } = useForm<FilterSchemaType>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      title,
      status,
      vehicle,
    },
  })

  function handleFilter({
    title,
    status,
    vehicle,
    dateRange,
  }: FilterSchemaType) {
    setFrom(dateRange?.from ? format(dateRange.from, 'yyyy/MM/dd') : null)
    setTo(dateRange?.to ? format(dateRange.to, 'yyyy/MM/dd') : null)
    setTitle(title ?? null)
    setVehicle(vehicle ?? null)
    setStatus(status ?? null)
  }

  function handleClearFilters() {
    setTitle(null)
    setTo(null)
    setFrom(null)
    setVehicle(null)
    setStatus(null)
    reset()
  }

  return (
    <section className="flex justify-between flex-col sm:flex-row gap-4">
      <form
        onSubmit={handleSubmit(handleFilter)}
        className="flex gap-2 flex-col sm:flex-row"
      >
        <div className="flex gap-2">
          <Input
            placeholder="Buscar..."
            className="max-w-96"
            {...register('title')}
          />
          <Controller
            name="dateRange"
            control={control}
            render={({ field }) => (
              <DatePickerWithRange
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          <Controller
            name="status"
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => (
              <Select
                name={name}
                onValueChange={onChange}
                value={value}
                disabled={disabled}
                defaultValue="all"
              >
                <SelectTrigger className="max-w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos status</SelectItem>
                  <SelectItem value="Scheduled">Agendado</SelectItem>
                  <SelectItem value="InProgress">Em Andamento</SelectItem>
                  <SelectItem value="Completed">Concluído</SelectItem>
                  {/* <SelectItem value="OnHold">Em Espera</SelectItem>
                <SelectItem value="Canceled">Cancelado</SelectItem>
                <SelectItem value="Failed">Falhou</SelectItem> */}
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="vehicle"
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => (
              <Select
                name={name}
                onValueChange={onChange}
                value={value}
                disabled={disabled}
                defaultValue="all vehicles"
              >
                <SelectTrigger className="max-w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all vehicles">
                    Todos os veículos
                  </SelectItem>
                  {vehicles?.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Button variant={'outline'} type="submit" className="flex gap-2">
            <Filter size={14} />
            Filtrar
          </Button>
          <Button
            className="flex gap-2"
            variant={'outline'}
            type="button"
            disabled={hasNoParams}
            onClick={handleClearFilters}
          >
            <X size={14} />
            Limpar
          </Button>
        </div>
      </form>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Item</DialogTitle>
              <DialogDescription>
                Preencha as informações abaixo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <ScheduleForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
