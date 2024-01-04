'use client'

import { DataTable } from '@/components/data-table'
import { Toaster } from '@/components/ui/sonner'
import { columns } from './columns'
import { Company } from '@/@types/company-table'
import CompanyForm from '@/components/company-form'
import getCompanies from '@/services/company/get-companies'
import { useEffect, useState } from 'react'

export default function CompanyPage() {
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    async function loadVehicles() {
      try {
        const companyData = await getCompanies()
        setCompanies(companyData)
      } catch (error) {
        console.error('Erro ao carregar item:', error)
      }
    }

    loadVehicles()
  }, [])

  return (
    <>
      <section className="py-12">
        <Toaster />

        <div className="container">
          <h1 className="text-3xl font-bold pb-6">Empresas</h1>
          <DataTable
            columns={columns}
            data={companies}
            formComponent={<CompanyForm />}
          />
        </div>
      </section>
    </>
  )
}
