type ScheduledStatus =
  | 'Scheduled'
  | 'InProgress'
  | 'Completed'
  | 'OnHold'
  | 'Canceled'
  | 'Failed'

interface ScheduledStatusProps {
  status: ScheduledStatus
}

const scheduledStatusMap: Record<ScheduledStatus, string> = {
  Scheduled: 'Agendado',
  InProgress: 'Em Progresso',
  OnHold: 'Em Espera',
  Completed: 'Concluído',
  Canceled: 'Cancelado',
  Failed: 'Falhou',
}

export function ScheduledStatus({ status }: ScheduledStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'Scheduled' && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}

      {status === 'InProgress' && (
        <span className="h-2 w-2 rounded-full bg-amber-500" />
      )}

      {status === 'OnHold' && (
        <span className="h-2 w-2 rounded-full bg-yellow-500" />
      )}

      {status === 'Completed' && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}

      {status === 'Canceled' && (
        <span className="h-2 w-2 rounded-full bg-rose-500" />
      )}

      {status === 'Failed' && (
        <span className="h-2 w-2 rounded-full bg-red-500" />
      )}

      <span className="font-medium text-muted-foreground">
        {scheduledStatusMap[status]}
      </span>
    </div>
  )
}
