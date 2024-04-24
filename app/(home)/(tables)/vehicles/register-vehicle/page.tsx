'use client'

import { ArrowLeft } from 'lucide-react'
import { Toaster } from 'sonner'

import Link from 'next/link'
import VehicleForm from '@/components/vehicle-form'

export default function RegisterVehicle() {
  return (
    <div>
      <Link href={'/vehicles'}>
        <ArrowLeft className="ml-32" />
      </Link>

      <section className="flex h-full justify-center items-center p-4">
        <Toaster />

        <VehicleForm />
      </section>
    </div>
  )
}
