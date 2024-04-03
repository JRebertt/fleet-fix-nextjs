import { Toaster } from '@/components/ui/sonner'
import { api } from '@/lib/api-fetch'
import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import { Payment, PaymentReponse } from '@/@types/payment'

async function getPayment(): Promise<Payment[]> {
  const response = await api('/payments', {
    method: 'Get',
    cache: 'no-store',
  })

  const { payments }: PaymentReponse = await response.json()
  return payments
}

export default async function PaymentPage() {
  const payment: Payment[] = await getPayment()

  return (
    <>
      <section className="py-12">
        <Toaster />

        <div className="container">
          <DataTable
            filterColumnName="id"
            columns={columns}
            data={payment}
            formComponent={false}
          />
        </div>
      </section>
    </>
  )
}
