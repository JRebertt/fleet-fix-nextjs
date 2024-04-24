import { Toaster } from '@/components/ui/sonner'
import { columns } from './columns'
import { DataTable } from '@/components/data-table'

import { Plus } from 'lucide-react'
import getPayments from '@/services/payment/get-payments'

export default async function PaymentPage() {
  const payments = await getPayments()

  return (
    <>
      <section>
        <Toaster />

        <div className="container">
          <DataTable
            filterColumnName="id"
            columns={columns}
            data={payments}
            routerForm={'/payment/register-payment'}
            buttonText={<Plus size={20} />}
          />
        </div>
      </section>
    </>
  )
}
