'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'

import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
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

import { Input } from './ui/input'

import { vehicleSchema } from '@/schemas/vehicle'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import createNewVehicle from '@/services/vehicle/create-new-vehicle'
import { useEffect, useState } from 'react'
import { Driver } from '@/@types/driver-table'
import { Company } from '@/@types/company-table'
import fetchDrivers from '@/services/driver/get-drivers'
import fetchCompanies from '@/services/company/fetch-companies'
import { useMutation } from '@tanstack/react-query'
import notifications from '@/utils/ notifications'
import { Icons } from './icons'

type VehicleFormValues = z.infer<typeof vehicleSchema>

export default function VehicleForm() {
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      model: '',
      make: '',
      licensePlate: '',
      vin: '',
      year: '',
      company_id: '',
      driver_id: '',
    },
  })

  const { mutateAsync: createNewVehicleFn } = useMutation({
    mutationFn: createNewVehicle,
  })

  async function onSubmit(values: VehicleFormValues) {
    try {
      toast.success(notifications.vehicle.create.success)
      await createNewVehicleFn(values)
      form.reset()
    } catch (err) {
      toast.error(notifications.vehicle.create.error)
    }
  }

  const [drivers, setDrivers] = useState<Driver[]>([])
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const driversList = await fetchDrivers()
      const companiesList = await fetchCompanies()
      setDrivers(driversList)
      setCompanies(companiesList)
    }

    fetchData()
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Marca do Veículo"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Modelo do Veículo"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Campo Placa do Veículo */}
          <FormField
            control={form.control}
            name="licensePlate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="licensePlate"
                    placeholder="Placa do Veículo"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Campo Número do RENAVAM */}
          <FormField
            control={form.control}
            name="vin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    id="renavamNumber"
                    placeholder="RENAVAM"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 items-center">
          <FormField
            control={form.control}
            name="company_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
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
                          ? companies.find((data) => data.id === field.value)
                              ?.name
                          : 'Empresa'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar Empresa..." />
                      <CommandEmpty>Nenhuma Empresa Encontrado.</CommandEmpty>
                      <CommandGroup>
                        {companies.map((data) => (
                          <CommandItem
                            value={data.name}
                            key={data.id}
                            onSelect={() => {
                              form.setValue('company_id', data.id as string)
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
                            {data.name}
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
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Campo Ano */}
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    min={4}
                    max={4}
                    id="year"
                    placeholder="Ano do Veículo"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Campo Motorista */}
          <FormField
            control={form.control}
            name="driver_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
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
                          ? drivers.find((data) => data.id === field.value)
                              ?.user?.name || 'Motorista'
                          : 'Motorista'}

                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar Motorista..." />
                      <CommandEmpty>Nenhum Motorista Encontrado.</CommandEmpty>
                      <CommandGroup>
                        {drivers.map((data) => (
                          <CommandItem
                            value={data.user?.name}
                            key={data.id}
                            onSelect={() => {
                              form.setValue('driver_id', data.id as string)
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
                            {data.user?.name}
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
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Salvar
        </Button>
      </form>
    </Form>
  )
}
