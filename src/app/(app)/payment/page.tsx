import { Pagination } from '@/components/pagination'
import { PaymentedTableFilters } from '@/components/payment/paymented-table-filters'
import { PaymentTableRow } from '@/components/payment/paymented-table-row'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { getPayments } from '@/http/payment/get-payments'

export default async function PaymentHome({
  searchParams,
}: {
  searchParams?: {
    description?: string
    vehicle?: string
    status?: string
    page?: string
  }
}) {
  const description = searchParams?.description || ''
  const vehicle = searchParams?.vehicle || ''
  const status = searchParams?.status || ''
  const page = searchParams?.page || ''

  const currentPage = Number(page) || 1
  const { payments, meta } = await getPayments({
    description,
    vehicle,
    status,
    page: currentPage,
  })

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pagamentos</h1>

        <div className="space-y-2.5">
          {/* // FIXME: This will cause a hydration error. */}
          <PaymentedTableFilters />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[132px]">Identificador</TableHead>
                  <TableHead className="w-[140px]">Placa</TableHead>
                  <TableHead className="w-[180px]">Agendado</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead className="w-[180px]">Título</TableHead>
                  <TableHead className="w-[162px]">Metodo</TableHead>
                  <TableHead className="w-[140px]">Custo total</TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <PaymentTableRow key={payment.id} payment={payment} />
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination
            pageIndex={meta.pageIndex}
            totalCount={meta.totalCount}
            perPage={meta.perPage}
          />
        </div>
      </div>
    </div>
  )
}
