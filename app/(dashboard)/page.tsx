import { MaintenanceSchedule } from '@/@types/maintenance.table'

import { api } from '@/lib/api-fetch'

import ScheduleCard from './schedule-card'
import { Toaster } from 'sonner'
import { CalendarForm } from '@/components/calendar-test'

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

  const filtered = schedule.filter(
    (schedule) =>
      schedule.status !== 'Concluído' && schedule.status !== 'Cancelado',
  )

  return (
    <>
      <Toaster />
      <section className="grid sm:grid-cols-3 gap-6">
        {filtered.length !== 0 ? (
          filtered.map((data, i) => {
            return <ScheduleCard key={i++} data={data} />
          })
        ) : (
          <p className="col-span-3 text-center">
            Nenhum Agendamento Encontrado
          </p>
        )}

        <CalendarForm />
      </section>
    </>
  )
}
