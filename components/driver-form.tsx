'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormMask } from 'use-mask-input'

import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { driverSchema } from '@/schemas/driver'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import createDriver from '@/services/driver/create-new-driver'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './ui/command'

import { Company } from '@/@types/company-table'
import fetchUsers from '@/services/company/fetch-users'
import fetchCompanies from '@/services/company/fetch-companies'
import { useMutation } from '@tanstack/react-query'
import notifications from '@/utils/ notifications'
import { Icons } from './icons'

type DriverFormValues = z.infer<typeof driverSchema>

export interface Users {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'MEMBER' | 'DRIVER'
  created_at: Date
}

export default function DriverForm() {
  const form = useForm<DriverFormValues>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      user_id: '',
      cpf: '',
      birthDate: null,
      company_id: '',
      contact_number: '',
      licenseExpiry: null,
      licenseNumber: '',
    },
  })

  const masked = useHookFormMask(form.register)

  const { mutateAsync: createDriverFn } = useMutation({
    mutationFn: createDriver,
  })

  async function onSubmit(value: DriverFormValues) {
    try {
      createDriverFn(value)
      toast.success(notifications.driver.create.success)
      form.reset()
    } catch (err) {
      toast.error(notifications.driver.create.error)
    }
  }

  const [users, setUsers] = useState<Users[]>([])
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const usersList = await fetchUsers()
      const companiesList = await fetchCompanies()
      setUsers(usersList)
      setCompanies(companiesList)
    }

    fetchData()
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 "
      >
        <FormField
          control={form.control}
          name="user_id"
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
                        ? users.find((data) => data.id === field.value)?.name
                        : 'Nome'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[20rem] sm:w-[24rem] p-0">
                  <Command className="">
                    <CommandInput placeholder="Buscar Motorista..." />
                    <CommandEmpty>Nenhum Motorista Encontrado.</CommandEmpty>
                    <CommandGroup>
                      {users.map((data) => (
                        <CommandItem
                          value={data.id}
                          key={data.id}
                          onSelect={() => {
                            form.setValue('user_id', data.id as string)
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

        {/* Campo Data de Nascimento */}
        {/* <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="dateOfBirth"
                  placeholder="Data de Nascimento"
                  {...field}
                  value={field.value ?? new Date()}
                  {...masked('birthDate', '99/99/9999')}
                  className="px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* Campo Numero da CNH */}
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Numero da CNH"
                  {...field}
                  value={field.value ?? ''}
                  className="px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo CPF */}
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="cpf"
                  placeholder="CPF"
                  {...field}
                  {...masked('cpf', '999.999.999-99')}
                  className="px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Numero de Contato */}
        <FormField
          control={form.control}
          name="contact_number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="contactNumber"
                  placeholder="Numero para Contato"
                  {...field}
                  value={field.value ?? ''}
                  {...masked('contact_number', '99 9999-9999')}
                  className="px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Empresa */}
        <FormField
          control={form.control}
          name="company_id"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Empresa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id as string}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting}
          className="col-span-2"
          type="submit"
        >
          {form.formState.isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Salvar
        </Button>
      </form>
    </Form>
  )
}
