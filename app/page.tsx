'use client'

import { MaintenanceSchedule } from '@/@types/maintenance.table'
import ScheduleForm from '@/components/schedule-form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import getMaintenanceSchedule from '@/services/maintenance-schedule/get-maintenance-schedule'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'

export default function Home() {
  const [schedule, setSchedule] = useState<MaintenanceSchedule[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const scheduleList = await getMaintenanceSchedule()
      setSchedule(scheduleList)
    }
    fetchData()
  }, [])

  return (
    <main className="min-h-screen p-10 space-y-6">
      <Toaster />
      <header className="flex">
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
      </header>
      <section className="max-w-6xl grid grid-cols-3 justify-items-center gap-28">
        {schedule.map((data, i) => {
          const dateObject = new Date(data.scheduledDate)
          const formattedDateV2 = format(dateObject, 'dd/MM/yyyy HH:mm:ss')
          return (
            <Card
              key={i++}
              className="min-h-[10rem] max-h-[16rem] p-4 flex flex-col gap-2 justify-center items-center"
            >
              <CardTitle>Agendamento</CardTitle>
              <CardHeader>{formattedDateV2}</CardHeader>
              <CardContent>
                <div>{data.vehicleId}</div>
                <div>{data.status}</div>
                <div>{data.priority}</div>
              </CardContent>
              <CardDescription>{data.description}</CardDescription>
              <CardFooter>
                <Button>Iniciar</Button>
              </CardFooter>
            </Card>
          )
        })}
      </section>
    </main>
  )
}
