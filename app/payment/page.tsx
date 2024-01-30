import { Toaster } from '@/components/ui/sonner'
import { api } from '@/lib/api-fetch'
import { z } from 'zod'
import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import { PaymentSchemas } from '@/schemas/payment'

type PaymentSchemasValues = z.infer<typeof PaymentSchemas>

async function getPayment(): Promise<PaymentSchemasValues[]> {
  const response = await api('/payment', {
    method: 'Get',
    cache: 'no-store',
  })

  const data = await response.json()
  return data
}

export default async function DriverPage() {
  const payment: PaymentSchemasValues[] = await getPayment()
  return (
    <>
      <section className="py-12">
        <Toaster />

        <div className="container">
          <h1 className="text-3xl font-bold pb-6">Pagamentos</h1>
          <DataTable
            filterColumnName="maintenanceId"
            columns={columns}
            data={payment}
            formComponent={false}
          />
        </div>
      </section>
    </>
  )
}
