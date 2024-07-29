type PaymentedStatus =
  | 'Pending'
  | 'InProcess'
  | 'Completed'
  | 'OnHold'
  | 'Canceled'
  | 'Failed'

interface PaymentedStatusProps {
  status: PaymentedStatus
}

const paymentedStatusMap: Record<PaymentedStatus, string> = {
  Pending: 'Pendente',
  InProcess: 'Em Processo',
  OnHold: 'Em Espera',
  Completed: 'Concluído',
  Canceled: 'Cancelado',
  Failed: 'Falhou',
}

export function PaymentedStatus({ status }: PaymentedStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'Pending' && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}

      {status === 'InProcess' && (
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
        {paymentedStatusMap[status]}
      </span>
    </div>
  )
}
