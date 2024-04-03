import { DataTable } from '@/components/data-table'
import { Toaster } from '@/components/ui/sonner'
import { columns } from './columns'
import CompanyForm from '@/components/company-form'
import fetchCompanies from '@/services/company/fetch-companies'

export default async function CompanyPage() {
  const companies = await fetchCompanies()
  return (
    <>
      <section className="py-12">
        <Toaster />

        <div className="container">
          <h1 className="text-3xl font-bold pb-6">Empresas</h1>
          <DataTable
            filterColumnName="name"
            columns={columns}
            data={companies}
            formComponent={<CompanyForm />}
          />
        </div>
      </section>
    </>
  )
}
