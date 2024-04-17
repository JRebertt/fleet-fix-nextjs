import { Toaster } from '@/components/ui/sonner'
import { columns } from './columns'
import { DataTable } from '@/components/data-table'

import PaymentForm from '@/components/payment-form'
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
            formComponent={<PaymentForm />}
            dialogTitle="Adicionar Novo Pagamento"
            dialogDescription="Preencha as informações abaixo para adicionar um novo pagamento ao
            sistema. Clique em salvar ao concluir."
            buttonText={<Plus size={20} />}
          />
        </div>
      </section>
    </>
  )
}
