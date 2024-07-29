'use server'

import type { HTTPErrorResponse } from '@/@types/types'
import { canceledPayment } from '@/http/payment/canceled-payment'
import { completedPayment } from '@/http/payment/completed-payment'
import { deletePayment } from '@/http/payment/delete-payment'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import * as z from 'zod'

const completedPaymentSchema = z.object({
  paymentDate: z.coerce.date({
    message: 'Por favor, insira uma data válida.',
  }),
  paymentMethod: z.string().min(3, {
    message: 'Por favor, insira um método de pagamento válido.',
  }),
  payment: z.string(),
})

export async function completedPaymentActions(data: FormData) {
  const result = completedPaymentSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    console.log(errors)

    return { success: false, message: null, errors }
  }

  const { paymentDate, payment, paymentMethod } = result.data

  try {
    await completedPayment({
      id: payment,
      paymentDate,
      paymentMethod,
    })

    revalidateTag('payments')
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

const canceledPaymentSchema = z.object({
  id: z.string(),
  amount: z.number(),
  description: z.string(),
  paymentDate: z.string(),
  paymentMethod: z.string(),
  status: z.string(),
  maintenance_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  maintenance: z.object({
    id: z.string(),
    title: z.string(),
    scheduledDate: z.string(),
    status: z.string(),
    description: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    cost: z.number(),
    vehicle_id: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    vehicle: z.object({
      id: z.string(),
      make: z.string(),
      model: z.string(),
      year: z.string(),
      licensePlate: z.string(),
      vin: z.string(),
      driver_id: z.string(),
      company_id: z.string(),
    }),
  }),
})

export async function canceledPaymentActions(data: FormData) {
  const paymentString = data.get('payment')

  if (!paymentString) {
    return { success: false, message: 'Invalid payment data.', errors: null }
  }

  const paymentData = JSON.parse(paymentString as string)

  const result = canceledPaymentSchema.safeParse(paymentData)

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    console.log(errors)

    return { success: false, message: null, errors }
  }

  const dataResult = result.data

  try {
    // Atualizar o status para "Canceled"
    const updatedPayment = { ...dataResult, status: 'Canceled' }

    // Lógica de cancelamento de pagamento usando o objeto updatedPayment
    await canceledPayment({
      id: updatedPayment.id,
      data: updatedPayment,
    })

    revalidateTag('payments')
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

const deletePaymentSchema = z.object({
  paymentId: z.string(),
})

export async function deletePaymentActions(data: FormData) {
  const result = deletePaymentSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    console.log(errors)

    return { success: false, message: null, errors }
  }

  const { paymentId } = result.data

  try {
    await deletePayment({
      id: paymentId,
    })

    revalidateTag('payments')
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
