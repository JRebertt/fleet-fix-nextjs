import { getRecentMaintenances } from '@/http/maintenance/get-recent-maintenances'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { ArrowUpRightIcon } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ScheduledStatus } from './scheduled/scheduled-status'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export async function RecentMaintenances() {
  const { maintenances } = await getRecentMaintenances(5)

  return (
    <Card className="col-span-4 md:col-span-3">
      <CardHeader className="flex flex-row justify-center">
        <span>
          <CardTitle>Manutenções Recentes</CardTitle>
          <CardDescription>You made 265 sales this month.</CardDescription>
        </span>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/scheduled" prefetch={false}>
            Ver todos
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="grid gap-8">
        {maintenances.map((maintenance) => {
          return (
            <div
              className="grid grid-cols-3 items-center gap-4"
              key={maintenance.id}
            >
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {maintenance.vehicle.model}
                </p>
                <p className="text-sm text-muted-foreground">
                  {maintenance.vehicle.licensePlate}
                </p>
              </div>
              <div className="text-center text-muted-foreground">
                {format(maintenance.scheduledDate, 'PP', { locale: ptBR })}
              </div>
              <div className="ml-16 font-medium">
                <ScheduledStatus status={maintenance.status} />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
