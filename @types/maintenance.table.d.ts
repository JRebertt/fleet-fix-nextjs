// Estrutura para acompanhar mudanças de status
export interface StatusChange {
  status: 'Agendado' | 'Concluído' | 'Cancelado' | 'Em Manutenção'
  changedAt: string
  reason?: string
}

export interface MaintenanceSchedule {
  id?: string // Identificador único do agendamento
  vehicleId: string // ID do veículo para o qual a manutenção está agendada
  scheduledDate: Date // Data agendada da manutenção
  description: string // Descrição da manutenção agendada
  priority: 'Alta' | 'Média' | 'Baixa' | 'Normal' // Prioridade do agendamento (opcional)
  contactPerson?: string // Contato responsável pelo veículo (opcional)
  statusChangeHistory: StatusChange[] // Histórico de alterações de status (opcional)
  status: 'Agendado' | 'Concluído' | 'Cancelado' // Status do agendamento
  createdAt?: string
  updatedAt?: string
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
