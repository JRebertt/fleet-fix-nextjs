'use client'

import { CompanySchema } from '@/schemas/company'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import createComapny from '@/services/company/create-new-company'
import { useMutation } from '@tanstack/react-query'
import notifications from '@/utils/ notifications'
import { Icons } from './icons'

type CompaniesFormValues = z.infer<typeof CompanySchema>

export default function CompanyForm() {
  const form = useForm<CompaniesFormValues>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      name: '',
      cnpj: '',
      contact_email: '',
      contact_number: '',
    },
  })

  const { mutateAsync: createComapnyFn } = useMutation({
    mutationFn: createComapny,
  })

  async function onSubmit(values: CompaniesFormValues) {
    try {
      toast.success(notifications.company.create.success)
      createComapnyFn(values)
      form.reset()
    } catch (err) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <main>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Nome da Empresa"
                      {...field}
                      className="px-3 py-2"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="cnpj"
                      placeholder="CNPJ"
                      {...field}
                      className="px-3 py-2"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="contactPhone"
                      placeholder="Conta da Empresa"
                      {...field}
                      className="px-3 py-2"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="corporateEmail"
                      placeholder="Email Corporativo"
                      {...field}
                      className="px-3 py-2"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </main>
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
