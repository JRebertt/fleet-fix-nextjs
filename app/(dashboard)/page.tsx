'use client'

import ScheduleCard from './schedule-card'
import { Toaster } from 'sonner'
import { useFilters } from '@/hooks/useFilter'
import { GetMaintenanceSchedule } from '@/@types/maintenance-table'

export default function Home() {
  const { schedules: filtered } = useFilters()

  return (
    <>
      <Toaster />
      <section className="grid sm:grid-cols-3 gap-6">
        {filtered.length !== 0 ? (
          filtered.map((data, i) => {
            return (
              <ScheduleCard key={i++} data={data as GetMaintenanceSchedule} />
            )
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
