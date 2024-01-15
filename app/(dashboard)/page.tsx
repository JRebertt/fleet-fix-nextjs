import { MaintenanceSchedule } from '@/@types/maintenance.table'
import ScheduleForm from '@/components/schedule-form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { api } from '@/lib/api-fetch'
import { format } from 'date-fns'
import { Toaster } from 'sonner'
import { ButtonStart } from './button-start'
import { Options } from './options'

async function getMaintenanceSchedule(): Promise<MaintenanceSchedule[]> {
  const response = await api('/maintenance-schedule', {
    method: 'GET',
    cache: 'no-store',
  })

  const maintenanceSchedule = await response.json()

  return maintenanceSchedule
}

export default async function Home() {
  const schedule = await getMaintenanceSchedule()

  return (
    <>
      <Toaster />
      <main className="min-h-screen p-10 space-y-14">
        <div className="flex">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Agendar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Item</DialogTitle>
                <DialogDescription>
                  Preencha as informações abaixo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <ScheduleForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <section className="max-w-6xl grid grid-cols-3 justify-items-center gap-28">
          {schedule.map((data, i) => {
            const dateObject = new Date(data.scheduledDate)
            const formattedDateV2 = format(dateObject, 'dd/MM/yyyy')
            return (
              <Card
                key={i++}
                className="max-h-[20rem] p-4 flex flex-col gap-2 justify-center items-center"
              >
                <CardHeader className="flex flex-row w-full items-center p-0 justify-between">
                  <span className="max-w-[6rem] font-semibold">
                    {formattedDateV2}
                  </span>
                  <Options value={data} />
                </CardHeader>
                <CardContent className="p-0">
                  <div>{data.vehicleId}</div>
                  <div>{data.status}</div>
                  <div>{data.priority}</div>
                </CardContent>
                <CardDescription className="p-0">
                  {data.description}
                </CardDescription>
                <CardFooter className="p-0">
                  <ButtonStart value={data} />
                </CardFooter>
              </Card>
            )
          })}
        </section>
      </main>
    </>
  )
}
