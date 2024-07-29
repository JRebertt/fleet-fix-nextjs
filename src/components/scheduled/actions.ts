'use server'

import type { HTTPErrorResponse } from '@/@types/types'
import { canceledSchedule } from '@/http/maintenance/canceled-maintenance-schedule'
import { deleteMaintenanceSchedule } from '@/http/maintenance/delete-maintenance-schedule'
import { startSchedule } from '@/http/maintenance/start-maintenance-schedule'
import { HTTPError } from 'ky'
import * as z from 'zod'

const startScheduleMaintenanceSchema = z.object({
  scheduledStartDate: z.coerce.date({
    message: 'Por favor, insira uma data agendada válida.',
  }),
  maintenanceId: z.string(),
})

export async function startScheduleMaintenanceActions(data: FormData) {
  const result = startScheduleMaintenanceSchema.safeParse(
    Object.fromEntries(data),
  )

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    console.log(errors)

    return { success: false, message: null, errors }
  }

  const { scheduledStartDate, maintenanceId } = result.data

  try {
    await startSchedule({
      id: maintenanceId,
      scheduledStartDate,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json<HTTPErrorResponse>()
      console.log(message, 'Mensagem de erro aqui')

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

const canceledScheduleMaintenanceSchema = z.object({
  maintenanceId: z.string(),
})

export async function canceledScheduleMaintenanceActions(data: FormData) {
  const result = canceledScheduleMaintenanceSchema.safeParse(
    Object.fromEntries(data),
  )

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    console.log(errors)

    return { success: false, message: null, errors }
  }

  const { maintenanceId } = result.data

  try {
    await canceledSchedule({
      id: maintenanceId,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json<HTTPErrorResponse>()
      console.log(message, 'Mensagem de erro aqui')

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

const deleteScheduleMaintenanceSchema = z.object({
  maintenanceId: z.string(),
})

export async function deleteScheduleMaintenanceActions(data: FormData) {
  const result = deleteScheduleMaintenanceSchema.safeParse(
    Object.fromEntries(data),
  )

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    console.log(errors)

    return { success: false, message: null, errors }
  }

  const { maintenanceId } = result.data

  try {
    await deleteMaintenanceSchedule({
      id: maintenanceId,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json<HTTPErrorResponse>()

      console.log(message)

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
