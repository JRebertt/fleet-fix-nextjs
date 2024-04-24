'use client'

import { ArrowLeft } from 'lucide-react'
import { Toaster } from 'sonner'

import Link from 'next/link'
import DriverForm from '@/components/driver-form'

export default function RegisterDriver() {
  return (
    <div>
      <Link href={'/drivers'}>
        <ArrowLeft className="ml-32" />
      </Link>

      <section className="flex h-full justify-center items-center p-4">
        <Toaster />

        <DriverForm />
      </section>
    </div>
  )
}
