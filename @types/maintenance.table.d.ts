export interface MaintenanceSchedule {
  id: string // Identificador único do agendamento
  vehicleId: string // ID do veículo para o qual a manutenção está agendada
  scheduledDate: Date // Data agendada da manutenção
  description: string // Descrição da manutenção agendada
  status: 'Agendada' | 'Concluída' | 'Cancelada' // Status do agendamento
}

export interface MaintenanceHistory {
  id: string // Identificador único da manutenção
  vehicleId: string // ID do veículo relacionado
  maintenanceDate: Date // Data da manutenção
  description: string // Descrição da manutenção
  serviceCost: number // Custo do serviço
  mileageAtMaintenance: number // Quilometragem no momento da manutenção
}
