import { DataTable } from '@/components/data-table'
import { Toaster } from '@/components/ui/sonner'
import { columns } from './columns'
import { Company } from '@/@types/company-table'
import { CheckCheckIcon } from 'lucide-react'

export default function CompanyPage() {
  const exampleCompany: Company[] = [
    {
      id: '1234567890',
      name: 'Example Company Ltd.',
      cnpj: '12.345.678/0001-90',
      address: {
        street: 'Example Street',
        number: '1000',
        complement: 'Suite 5A',
        neighborhood: 'Business District',
        city: 'Example City',
        state: 'EC',
        zipCode: '12345-678',
      },
      socialMedia: [
        {
          name: 'Facebook',
          url: 'https://www.facebook.com/examplecompany',
        },
        {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/company/examplecompany',
        },
      ],
      contactPhone: '+55 11 1234-5678',
      billingEmail: 'billing@examplecompany.com',
      logisticsEmail: 'logistics@examplecompany.com',
      corporateEmail: 'contact@examplecompany.com',
      financialEmail: 'finance@examplecompany.com',
      stateRegistration: '987654321',
      responsiblePersonName: {
        name: 'John Doe',
        contact: '+55 11 8765-4321',
      },
      createdAt: new Date().toLocaleString('pt-BR'),
      updatedAt: new Date().toLocaleString('pt-BR'),
    },
  ]
  return (
    <>
      <section className="py-12">
        <Toaster />

        <div className="container">
          <h1 className="text-3xl font-bold pb-6">Empresas</h1>
          <DataTable
            columns={columns}
            data={exampleCompany}
            formComponent={<CheckCheckIcon />}
          />
        </div>
      </section>
    </>
  )
}
