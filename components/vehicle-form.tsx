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

type VehicleFormValues = z.infer<typeof vehicleSchema>

const fakeDatas = [
  { driveName: 'João Silva', value: '1' },
  { driveName: 'Maria Fernandes', value: '2' },
  { driveName: 'Carlos Souza', value: '3' },
  { driveName: 'Ana Pereira', value: '4' },
  { driveName: 'Pedro Santos', value: '5' },
]

const companies = [
  { name: 'Norte Gases', value: 'norte-gases' },
  { name: 'SMTransportes', value: 'sm-transportes' },
  { name: 'Particular', value: 'particular' },
]

export default function VehicleForm() {
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      model: '',
      licensePlate: '',
      chassisNumber: '',
      renavamNumber: '',
      crlveNumber: '',
      currentMileage: '',
      year: '',
      driver: '',
      purchaseDate: '',
      photos: [],
      company: '',
      vehicleStatus: 'Em Viagem',
    },
  })

  async function onSubmit(values: VehicleFormValues) {
    toast('Veículo adicionado com sucesso!✅ ')
    form.reset()
    await createNewVehicle(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 p-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Campo Modelo */}
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="model"
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
          {/* Campo Número do CRLVe */}
          <FormField
            control={form.control}
            name="crlveNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="crlveNumber"
                    placeholder="Número do CRLVe"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Número do RENAVAM */}
          <FormField
            control={form.control}
            name="renavamNumber"
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
            name="purchaseDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Data da compra"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
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
                          ? companies.find((data) => data.value === field.value)
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
                            key={data.value}
                            onSelect={() => {
                              form.setValue('company', data.value)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                data.value === field.value
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
            name="driver"
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
                          ? fakeDatas.find((data) => data.value === field.value)
                              ?.driveName
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
                        {fakeDatas.map((data) => (
                          <CommandItem
                            value={data.driveName}
                            key={data.value}
                            onSelect={() => {
                              form.setValue('driver', data.value)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                data.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {data.driveName}
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

        {/* Campo Quilometragem Atual */}
        <FormField
          control={form.control}
          name="currentMileage"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="currentMileage"
                  placeholder="Quilometragem Atual"
                  {...field}
                  className="px-3 py-2"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="chassisNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="chassisNumber"
                  placeholder="Chassi"
                  {...field}
                  className="px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Salvar Veículo</Button>
      </form>
    </Form>
  )
}
