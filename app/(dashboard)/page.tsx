import ScheduleCard from './schedule-card'
import { Toaster } from 'sonner'
import fetchMaintenanceSchedule from '@/services/maintenance-schedule/fetch-maintenance-schedule'

export default async function Home() {
  const schedule = await fetchMaintenanceSchedule()

  const filtered = schedule.filter(
    (schedule) =>
      schedule.status !== 'Completed' && schedule.status !== 'Canceled',
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
      </section>
    </>
  )
}
