export interface Payment {
  id: string // Adicionado conforme solicitado
  amount: number
  description: string | null // 'string | null' reflete 'z.string().nullable()'
  paymentDate: Date | null // 'Date | null' reflete 'z.date().nullable()'
  paymentMethod: 'Card' | 'Boleto' | 'Transfer' | 'Cash' | 'Pix' // Enum definido
  status:
    | 'Pending'
    | 'Completed'
    | 'Canceled'
    | 'Failed'
    | 'InProcess'
    | 'OnHold' // Enum definido
  maintenance_id: string
}

export interface PaymentReponse {
  payments: Payment[]
}
