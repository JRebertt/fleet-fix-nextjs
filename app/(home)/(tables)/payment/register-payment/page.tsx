'use client'

import { ArrowLeft } from 'lucide-react'
import { Toaster } from 'sonner'

import Link from 'next/link'
import PaymentForm from '@/components/payment-form'

export default function RegisterPayment() {
  return (
    <div>
      <Link href={'/payment'}>
        <ArrowLeft className="ml-32" />
      </Link>

      <section className="flex h-full justify-center items-center p-4">
        <Toaster />

        <PaymentForm />
      </section>
    </div>
  )
}
