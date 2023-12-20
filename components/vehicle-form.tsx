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

import { vehicleFormSchema } from '@/schemas/vehicle'
import { toast } from './ui/use-toast'
import { Button } from './ui/button'

type VehicleFormValues = z.infer<typeof vehicleFormSchema>

const fakeDatas = [
  { driveName: 'Alex', value: '376decef-6031-41a4-a555-b9464e230fea' },
  { driveName: 'Maria', value: '4f7f8817-eb9b-4ced-9454-a4dcc3133f32' },
  { driveName: 'John', value: '5fac34a4-f158-4189-8bd2-2447877f2f1b' },
  { driveName: 'Sophia', value: '48aa7c01-87a1-4ef0-ad60-2172e70547c9' },
  { driveName: 'Lucas', value: 'c6849f1d-1ba9-4fb2-821c-226c38113d9f' },
  { driveName: 'Emma', value: ' 8e9aa0e5-461d-4442-808f-55eeed6de7f9' },
  { driveName: 'Daniel', value: '8b540ae7-80bb-440e-8258-f1bfb940cdc4' },
  { driveName: 'Isabella', value: '44a3c865-d7a0-4937-8d40-f92de13be118' },
  { driveName: 'David', value: ' 28d5f66a-313f-4d16-8641-7a7592c560cc' },
  { driveName: 'Olivia', value: 'eab99276-6543-48da-84a0-c5dc59bfb8c1' },
]

export default function VehicleForm() {
  const uuid = crypto.randomUUID()

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      id: uuid,
      model: '',
      licensePlate: '',
      chassisNumber: '',
      renavamNumber: '',
      photos: [],
      crlveNumber: '',
      driver: '',
      vehicleStatus: 'Em Viagem',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  function onSubmit(values: VehicleFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    console.log(values)
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
                    min={10}
                    max={12}
                    id="crlveNumber"
                    placeholder="Número do CRLVe"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
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
                    min={9}
                    max={11}
                    id="renavamNumber"
                    placeholder="RENAVAM"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="purchaseDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Data da compra"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />

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
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Campo Número do Chassi */}
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
                          'w-[200px] justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? fakeDatas.find(
                              (fakeData) => fakeData.value === field.value,
                            )?.driveName
                          : 'Selecione um Motorista'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar Motorista..." />
                      <CommandEmpty>Nenhum Motorista Encontrado.</CommandEmpty>
                      <CommandGroup>
                        {fakeDatas.map((fakeData) => (
                          <CommandItem
                            value={fakeData.driveName}
                            key={fakeData.value}
                            onSelect={() => {
                              form.setValue('driver', fakeData.value)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                fakeData.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {fakeData.driveName}
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

        <Button type="submit">Salvar Veículo</Button>
      </form>
    </Form>
  )
}
