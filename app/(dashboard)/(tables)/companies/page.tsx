import { DataTable } from '@/components/data-table'
import { Toaster } from '@/components/ui/sonner'
import { columns } from './columns'
import CompanyForm from '@/components/company-form'
import fetchCompanies from '@/services/company/fetch-companies'
import { Plus } from 'lucide-react'

export default async function CompanyPage() {
  const companies = await fetchCompanies()
  return (
    <>
      <section>
         <Toaster /> 

        <div className="container">
          <DataTable
            filterColumnName="name"
            columns={columns}
            data={companies}
            formComponent={<CompanyForm />}
            buttonText={<Plus size={20} />}
          />
        </div>
      </section>
    </>
  )
}
