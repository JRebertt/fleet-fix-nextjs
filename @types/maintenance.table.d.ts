// Estrutura para acompanhar mudanças de status
export interface StatusChange {
  status: 'Agendado' | 'Concluído' | 'Cancelado' | 'Em Manutenção'
  changedAt: string // Data e hora da mudança de status
  reason?: string // Motivo da mudança de status (opcional)
}

// Estrutura de uma Ordem de Manutenção
export interface MaintenanceSchedule {
  id?: string // Identificador único da ordem de manutenção
  vehicleId: string // ID do veículo
  scheduledDate: Date // Data agendada para a manutenção
  title?: string // Título da ordem de manutenção (opcional)
  description: string // Descrição detalhada da manutenção
  priority: 'Alta' | 'Média' | 'Baixa' // Prioridade da manutenção
  contactPerson?: string // Pessoa de contato para a manutenção (opcional)
  status: 'Agendado' | 'Concluído' | 'Cancelado' | 'Em Manutenção' // Status atual da ordem
  statusChangeHistory: StatusChange[] // Histórico de alterações de status
  startDate?: string // Data de início real da manutenção (opcional)
  completionDate?: string // Data de conclusão da manutenção (opcional)
  mechanicAssigned?: string // Mecânico responsável pela ordem
  workshopId: string // ID da oficina responsável
  serviceList?: {
    title: string
    checked: boolean
  }[] // Lista de serviços a serem realizados
  payment: {
    amount: string // Valor do pagamento
    paymentStatus?: 'Pago' | 'Pendente' // Status do pagamento
    paymentMethod?: 'Cartão de Crédito' | 'Débito' | 'Pix' // Método de pagamento
    paymentedDate?: string
  }
  feedback?: string // Feedback ou observações sobre a ordem (opcional)
  createdAt?: string // Data de criação da ordem (opcional)
  updatedAt?: string // Data da última atualização da ordem (opcional)
}

// Estrutura para anexos (fotos, documentos)
export interface Attachment {
  type: 'Image' | 'Document'
  url: string
  description?: string
}

export interface MaintenanceHistory {
  id?: string
  vehicleId: string // ID do veículo relacionado
  maintenanceDate: string // Data da manutenção
  description?: string // Descrição da manutenção
  serviceCost: number // Custo do serviço
  mileageAtMaintenance: number // Quilometragem no momento da manutenção
  serviceOrderId?: string // ID da ordem de serviço relacionada (opcional)
  serviceType: 'Preventiva' | 'Corretiva' | 'Emergencial' // Tipo de serviço realizado
  attachments?: Attachment[] // Anexos relacionados à manutenção (opcional)
  createdAt: string
  updatedAt: string
}
