import {
  Banknote,
  CreditCard,
  DollarSign,
  FileText,
  Landmark,
} from 'lucide-react'

type PaymentMethod = 'Boleto' | 'Transfer' | 'Card' | 'Cash' | 'Pix'

interface PaymentMethodProps {
  method: PaymentMethod
}

const paymentMethodMap: Record<
  PaymentMethod,
  { label: string; icon: JSX.Element }
> = {
  Boleto: {
    label: 'Boleto',
    icon: <FileText className="h-4 w-4" />,
  },
  Transfer: {
    label: 'Transferência',
    icon: <Landmark className="h-4 w-4" />,
  },
  Card: {
    label: 'Cartão',
    icon: <CreditCard className="h-4 w-4" />,
  },
  Cash: {
    label: 'Dinheiro',
    icon: <DollarSign className="h-4 w-4" />,
  },
  Pix: { label: 'Pix', icon: <Banknote className="h-4 w-4" /> },
}

export function PaymentMethod({ method }: PaymentMethodProps) {
  const { label, icon } = paymentMethodMap[method]

  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-medium text-muted-foreground">{label}</span>
    </div>
  )
}
