// Estrutura para acompanhar mudanças de status
type MaintenanceStatus =
  | 'Scheduled'
  | 'InProgress'
  | 'Completed'
  | 'OnHold'
  | 'Canceled'
  | 'Failed'

// Estrutura de uma Ordem de Manutenção
export interface MaintenanceSchedule {
  id: string
  title: string
  scheduledDate: Date
  description: string | null
  status: MaintenanceStatus
  startDate: Date | null
  endDate: Date | null
  cost: number | null
  vehicle_id: string
}

export interface MaintenanceResponse {
  maintenances: MaintenanceSchedule[]
}

// Estrutura para anexos (fotos, documentos)
// export interface Attachment {
//   type: 'Image' | 'Document'
//   url: string
//   description?: string
// }

// export interface MaintenanceHistory {
//   id?: string
//   vehicleId: string // ID do veículo relacionado
//   maintenanceDate: string // Data da manutenção
//   description?: string // Descrição da manutenção
//   serviceCost: number // Custo do serviço
//   mileageAtMaintenance: number // Quilometragem no momento da manutenção
//   serviceOrderId?: string // ID da ordem de serviço relacionada (opcional)
//   serviceType: 'Preventiva' | 'Corretiva' | 'Emergencial' // Tipo de serviço realizado
//   attachments?: Attachment[] // Anexos relacionados à manutenção (opcional)
//   createdAt: string
//   updatedAt: string
// }
