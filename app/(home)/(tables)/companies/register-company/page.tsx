'use client'

import { ArrowLeft } from 'lucide-react'
import { Toaster } from 'sonner'

import Link from 'next/link'
import CompanyForm from '@/components/company-form'

export default function RegisterCompany() {
  return (
    <div>
      <Link href={'/companies'}>
        <ArrowLeft className="ml-32" />
      </Link>

      <section className="flex h-full justify-center items-center p-4">
        <Toaster />

        <CompanyForm />
      </section>
    </div>
  )
}
