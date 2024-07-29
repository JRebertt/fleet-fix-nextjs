'use server'

import { createSchedule } from '@/http/maintenance/create-schedule'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import * as z from 'zod'

const scheduleSchema = z.object({
  title: z.string().min(2, { message: 'Por favor, insira um título válido.' }),
  scheduledDate: z.coerce.date({
    message: 'Por favor, insira uma data agendada válida.',
  }),
  status: z
    .enum([
      'Scheduled',
      'InProgress',
      'OnHold',
      'Completed',
      'Canceled',
      'Failed',
    ])
    .default('Scheduled'),
  description: z.string().nullable(),
  vehicleId: z.string().min(2, { message: 'Por favor, selecione um veículo.' }),
})

export async function createScheduleMaintenanceAction(data: FormData) {
  const result = scheduleSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    console.log(errors)

    return { success: false, message: null, errors }
  }

  const { title, description, vehicleId, scheduledDate } = result.data

  try {
    await createSchedule({
      title,
      description,
      scheduledDate,
      vehicleId,
      status: 'Scheduled',
    })

    revalidateTag('maintenances')
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
