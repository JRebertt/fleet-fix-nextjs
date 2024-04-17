import { Metadata } from 'next'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, DollarSign, Wrench } from 'lucide-react'

// import { CalendarDateRangePicker } from '@/app/(app)/examples/dashboard/components/date-range-picker'
// import { Overview } from '@/app/(app)/examples/dashboard/components/overview'
// import { RecentSales } from '@/app/(app)/examples/dashboard/components/recent-sales'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Example dashboard app built using the components.',
}

interface Props {
  totalCost: number
  averageCost: number
  totalMaintenance: number
}

export default function DashboardPage({
  totalCost = 0,
  averageCost = 0,
  totalMaintenance = 0,
}: Props) {
  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
              {/* <Button>Download</Button> */}
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de Manutenções
                  </CardTitle>
                  <Wrench size={16} className="text-zinc-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalMaintenance}</div>
                  {/* <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Custo Total
                  </CardTitle>
                  <DollarSign size={16} className="text-zinc-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalCost.toLocaleString('pt-BR', {
                      currency: 'BRL',
                      style: 'currency',
                    })}
                  </div>
                  {/* <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Custo Médio
                  </CardTitle>
                  <Calculator size={16} className="text-zinc-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {averageCost.toLocaleString('pt-BR', {
                      currency: 'BRL',
                      style: 'currency',
                    })}
                  </div>
                  {/* <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p> */}
                </CardContent>
              </Card>
              {/* <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Tempo Médio de Resolução
                    </CardTitle>
                    <Clock size={16} className="text-zinc-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card> */}
            </div>
            {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Distribuição de Manutenções por Status</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">{<Overview />}</CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Manutenções Recentes</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
