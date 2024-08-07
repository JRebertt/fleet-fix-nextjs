'use server'

import { Payment } from '@/@types/payment'
import { api } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { COOKIE_NAME } from '@/lib/cookies'

type GetPaymentByIdResponse = {
  payment: Payment
}

export async function getPaymentById(id: string): Promise<Payment> {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/payment/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token?.value}`,
      'Content-Type': 'application/json',
    },
  })
  const { payment }: GetPaymentByIdResponse = await res.json()
  return payment
}
