'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormMask } from 'use-mask-input'

import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'

import { Input } from './ui/input'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import getCompanies from '@/services/company/get-companies'
import { Company } from '@/@types/company-table'
import { driverSchema } from '@/schemas/driver'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import createNewDriver from '@/services/driver/create-new-driver'

type DriverFormValues = z.infer<typeof driverSchema>

export default function DriverForm() {
  const form = useForm<DriverFormValues>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      nickname: '',
      fullName: '',
      dateOfBirth: '',
      driverLicenseNumber: '',
      cpf: '',
      hireDate: '',
      contactNumber: '',
      driverPhoto: '',
      company: '',
    },
  })

  const masked = useHookFormMask(form.register)

  async function onSubmit(value: DriverFormValues) {
    toast('Empresa adicionado com sucesso!✅ ')
    form.reset()
    createNewDriver(value)
  }

  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const companiesList = await getCompanies()
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
        {/* Campo Nome Completo */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl>
                <Input
                  id="fullName"
                  placeholder="Nome Completo"
                  {...field}
                  className="px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Apelido */}
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="nickname"
                  placeholder="Apelido"
                  {...field}
                  className="px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Data de Nascimento */}
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="dateOfBirth"
                  placeholder="Data de Nascimento"
                  {...field}
                  {...masked('dateOfBirth', '99/99/9999')}
                  className="px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Numero da CNH */}
        <FormField
          control={form.control}
          name="driverLicenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="driverLicenseNumber"
                  placeholder="Numero da CNH"
                  {...field}
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

        {/* Campo Data de Adimissão */}
        <FormField
          control={form.control}
          name="hireDate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="hireDate"
                  placeholder="Data de Adimissão"
                  {...field}
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
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="contactNumber"
                  placeholder="Numero para Contato"
                  {...field}
                  {...masked('contactNumber', '99 9999-9999')}
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
          name="driverPhoto"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="driverPhoto"
                  placeholder="Foto do Motorista"
                  {...field}
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
          name="company"
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

        <Button className="col-span-2" type="submit">
          Salvar Veículo
        </Button>
      </form>
    </Form>
  )
}
