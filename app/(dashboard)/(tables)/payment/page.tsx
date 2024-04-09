import { Toaster } from '@/components/ui/sonner'
import { api } from '@/lib/api-fetch'
import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import { Payment, PaymentReponse } from '@/@types/payment'
import PaymentForm from '@/components/payment-form'
import { Plus } from 'lucide-react'

async function getPayment(): Promise<Payment[]> {
  const response = await api('/payments', {
    method: 'Get',
    cache: 'no-store',
  })

  const { payments }: PaymentReponse = await response.json()
  return payments || []
}

export default async function PaymentPage() {
  const payment: Payment[] = await getPayment()

  console.log(payment)

  return (
    <>
      <section>
        <Toaster />

        <div className="container">
          <DataTable
            filterColumnName="id"
            columns={columns}
            data={payment}
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