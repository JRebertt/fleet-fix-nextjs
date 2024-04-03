interface PaymentStatusProps {
  status:
    | 'Pending'
    | 'Completed'
    | 'Canceled'
    | 'Failed'
    | 'InProcess'
    | 'OnHold'
}

export const PaymentStatusDisplay = ({ status }: PaymentStatusProps) => {
  const statusMap = {
    Pending: { label: 'Pendente', color: 'bg-yellow-500' },
    Completed: { label: 'Concluído', color: 'bg-green-500' },
    Canceled: { label: 'Cancelado', color: 'bg-red-500' },
    Failed: { label: 'Falhou', color: 'bg-red-600' },
    InProcess: { label: 'Em Processamento', color: 'bg-blue-500' },
    OnHold: { label: 'Em Espera', color: 'bg-orange-500' },
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${statusMap[status].color}`} />
      <span>{statusMap[status].label}</span>
    </div>
  )
}
