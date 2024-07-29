import { CardMetrics } from '@/components/card-metrics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Calculator, Clock, DollarSign, Wrench } from 'lucide-react'
import RevenueChart from './revenue-chart'

import { RecentMaintenances } from './recent-maintenances'
import getMetrics from '@/http/metrics/get-metrics'
import { formatDuration, intervalToDuration } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default async function Dashboard() {
  const { metrics } = await getMetrics()

  const formatResolutionTime = (minutes: number) => {
    const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 })
    return formatDuration(duration, { locale: ptBR })
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardMetrics
          title="Total de Manutenções"
          icon={Wrench}
          amount={metrics.totalMaintenances}
          isMoney={false}
        />
        <CardMetrics
          title="Custo Total"
          icon={DollarSign}
          amount={metrics.totalCost}
          isMoney
        />
        <CardMetrics
          title="Custo Médio"
          icon={Calculator}
          amount={metrics.averageCost}
          isMoney
        />
        <CardMetrics
          title="Tempo Médio de Resolução"
          icon={Clock}
          amount={formatResolutionTime(metrics.averageResolutionTime)}
          isMoney={false}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Distribuição de Manutenções por Status</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueChart />
            {/* <Component /> */}
          </CardContent>
        </Card>
        <RecentMaintenances />
      </div>
    </div>
  )
}
