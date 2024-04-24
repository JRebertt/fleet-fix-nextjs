type MaintenanceStatus =
  | 'Scheduled'
  | 'InProgress'
  | 'Completed'
  | 'OnHold'
  | 'Canceled'
  | 'Failed'

type PaymentStatus =
  | 'Pending'
  | 'Completed'
  | 'Canceled'
  | 'Failed'
  | 'InProcess'
  | 'OnHold'

type PaymentMethod = 'Card' | 'Boleto' | 'Transfer' | 'Cash' | 'Pix'

interface Maintenance {
  id: string
  title: string
  scheduledDate: string // Considerando ISO string para datas
  status: MaintenanceStatus // Enum simplificado, ajuste conforme necessário
  description: string
  startDate: string // Considerando ISO string para datas
  endDate: string // Considerando ISO string para datas
  cost: number
  vehicle_id: string
  created_at: string // Considerando ISO string para datas
  updated_at: string // Considerando ISO string para datas
}

export interface Payment {
  id: string
  amount: number
  description: string | null // 'string | null' para descrição opcional
  paymentDate: Date | null // 'Date | null' para data de pagamento opcional
  paymentMethod: PaymentMethod // Tipos de métodos de pagamento
  status: PaymentStatus
  maintenance_id: string

  maintenance?: Maintenance
}
export interface PaymentReponse {
  payments: Payment[]
}
