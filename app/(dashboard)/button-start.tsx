'use client'

import { Button } from '@/components/ui/button'
import { WorkOrderSchema } from '@/schemas/work-orders'
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
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import React from 'react'

type WorkOrderFormsValues = z.infer<typeof WorkOrderSchema>

export function ButtonStart({ value }: { value: MaintenanceSchedule }) {
  const [isOpen, setIsOpen] = React.useState(false)

  const form = useForm<WorkOrderFormsValues>({
    resolver: zodResolver(WorkOrderSchema),
    defaultValues: {
      workshopId: '',
      vehicleId: value.vehicleId,
      mechanicAssigned: '',
      serviceDetails: [],
      entryDate: new Date().toDateString(),
      feedback: '',
      status: 'Em Andamento',
    },
  })

  async function onSubmit(values: WorkOrderFormsValues) {
    toast('Manutenção iniciada sucesso!✅ ')
    form.reset()
    setIsOpen(false) // Isso fechará o diálogo
    console.log('startWorkOrder', values)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Inicia O.S
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Item</DialogTitle>
          <DialogDescription>Preencha as informações abaixo.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
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
      </DialogContent>
    </Dialog>
  )
}
