import Link from 'next/link'
import ScheduledForm from './schedule-form'
import { ArrowLeft } from 'lucide-react'

export default function CreateSchedule() {
  return (
    <div className="space-y-4 p-4">
      <main className="mx-auto w-full max-w-[700px] space-y-4">
        <div className="flex items-center gap-4">
          <Link href={'/'}>
            <ArrowLeft />
          </Link>

          <h1 className="text-2xl font-bold">Criar Agendamento</h1>
        </div>

        <ScheduledForm />
      </main>
    </div>
  )
}
