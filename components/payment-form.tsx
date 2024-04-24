'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { CalendarIcon } from 'lucide-react'

import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { PaymentSchema } from '@/schemas/payment'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import createPayment from '@/services/payment/create-new-payment'
import { Icons } from './icons'
import { useMutation } from '@tanstack/react-query'
import notifications from '@/utils/ notifications'

type Status = {
  name:
    | 'Pendente'
    | 'Concluído'
    | 'Cancelado'
    | 'Falhou'
    | 'Em Processamento'
    | 'Em Espera'
  value:
    | 'Pending'
    | 'Completed'
    | 'Canceled'
    | 'Failed'
    | 'InProcess'
    | 'OnHold'
}

const statusOptions: Status[] = [
  {
    name: 'Pendente',
    value: 'Pending',
  },
  {
    name: 'Concluído',
    value: 'Completed',
  },
  {
    name: 'Cancelado',
    value: 'Canceled',
  },
  {
    name: 'Falhou',
    value: 'Failed',
  },
  {
    name: 'Em Processamento',
    value: 'InProcess',
  },
  {
    name: 'Em Espera',
    value: 'OnHold',
  },
]

type PaymentMethod = {
  name: 'Cartão' | 'Boleto' | 'Transferência' | 'Dinheiro' | 'Pix'
  value: 'Card' | 'Boleto' | 'Transfer' | 'Cash' | 'Pix'
}

const methodsOptions: PaymentMethod[] = [
  {
    value: 'Card',
    name: 'Cartão',
  },
  {
    value: 'Boleto',
    name: 'Boleto',
  },
  {
    value: 'Transfer',
    name: 'Transferência',
  },
  {
    value: 'Cash',
    name: 'Dinheiro',
  },
  {
    value: 'Pix',
    name: 'Pix',
  },
]

type PaymentFormValues = z.infer<typeof PaymentSchema>

export default function PaymentForm() {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      amount: 0,
      description: '',
      maintenance_id: null,
      paymentDate: new Date(),
    },
  })

  const { mutateAsync: createPaymentFn } = useMutation({
    mutationFn: createPayment,
  })

  async function onSubmit(values: PaymentFormValues) {
    console.log(values)
    try {
      toast.success(notifications.payment.create.success)
      await createPaymentFn(values)
      form.reset()
    } catch (err) {
      toast.success(notifications.payment.create.success)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-xl w-full"
      >
        <FormField
          control={form.control}
          name="amount"
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ''}
                  placeholder="Descrição"
                  className="px-3 py-2"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Metodo de Pagamento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {methodsOptions.map((data, i) => (
                    <SelectItem key={i++} value={data.value}>
                      {data.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Status do Pagemento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statusOptions.map((data, i) => (
                    <SelectItem key={i++} value={data.value}>
                      {data.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentDate"
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

        <Button
          className="w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Continuar
        </Button>
      </form>
    </Form>
  )
}
