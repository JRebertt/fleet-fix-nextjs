import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { getMaintenanceScheduleWithParams } from '@/http/maintenance/get-maintenance-schedule-with-params'
import { Suspense } from 'react'
import PaymentTableSkeleton from '@/app/(app)/payment/loading'
import { ScheduledTableFilters } from '@/components/scheduled/scheduled-table-filters'
import { ScheduledTableRow } from '@/components/scheduled/scheduled-table-row'
import { Pagination } from '@/components/pagination'

export default async function ScheduledPage({
  searchParams,
}: {
  searchParams?: {
    title?: string
    vehicle?: string
    status?: string
    page?: string
  }
}) {
  const title = searchParams?.title || ''
  const vehicle = searchParams?.vehicle || ''
  const status = searchParams?.status || ''
  const page = searchParams?.page || ''

  const currentPage = Number(page) || 1

  const { maintenances: maintenancesParams, meta } =
    await getMaintenanceScheduleWithParams({
      title,
      vehicle,
      status,
      page: currentPage,
    })

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Agendamentos</h1>

        <div className="space-y-2.5">
          {/* // TODO: Add range date. */}
          {/* // FIXME: This will cause a hydration error. */}
          <ScheduledTableFilters />

          <div className="bscheduled rounded-md">
            <Suspense fallback={<PaymentTableSkeleton />}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[64px]"></TableHead>
                    <TableHead className="w-[132px]">Identificador</TableHead>
                    <TableHead className="w-[140px]">Placa</TableHead>
                    <TableHead className="w-[180px]">Agendado</TableHead>
                    <TableHead className="w-[140px]">Status</TableHead>
                    <TableHead className="w-[180px]">Título</TableHead>
                    <TableHead className="w-[140px]">Custo total</TableHead>
                    <TableHead className="w-[132px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenancesParams.map((maintenance) => {
                    return (
                      <ScheduledTableRow
                        key={maintenance.id}
                        maintenance={maintenance}
                      />
                    )
                  })}
                </TableBody>
              </Table>
            </Suspense>
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
