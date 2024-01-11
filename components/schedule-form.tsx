'use client'

import { MaintenanceScheduleSchema } from '@/schemas/maintenance-schedule'
import createNewMaintenanceSchedule from '@/services/maintenance-schedule/create-new-maintenance-schedule'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormControl, FormField, FormItem } from './ui/form'
import { Input } from './ui/input'
import { ComboBoxResponsive } from './responsive-menu'

type ScheduleFormValues = z.infer<typeof MaintenanceScheduleSchema>
export default function ScheduleForm() {
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(MaintenanceScheduleSchema),
    defaultValues: {
      vehicleId: '',
      scheduledDate: '',
      description: '',
      priority: 'Normal',
      contactPerson: '',
      statusChangeHistory: [
        {
          status: 'Agendado',
          changedAt: new Date().toISOString(),
          reason: 'Agendamento inicial',
        },
      ],
    },
  })

  function onSubmit(values: ScheduleFormValues) {
    console.log(values)
    createNewMaintenanceSchedule(values)
  }
  return (
    // <Form {...form}>
    //   <form>
    //     <FormField
    //       control={form.control}
    //       name="description"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormControl>
    //             <Input
    //               placeholder="Descrição"
    //               {...field}
    //               className="px-3 py-2"
    //             />
    //           </FormControl>
    //         </FormItem>
    //       )}
    //     />

    //   </form>
    // </Form>

    <div>
      <ComboBoxResponsive />
    </div>
  )
}
