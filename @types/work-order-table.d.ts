export interface WorkOrder {
  workshopId: string // ID da oficina responsável
  vehicleId: string // ID do veículo em serviço
  mechanicAssigned: string // Mecânico atribuído à ordem
  entryDate: string // Data de entrada da ordem de serviço
  completionDate?: string // Data de conclusão da ordem de serviço (opcional)
  serviceDetails: string[] // Detalhes dos serviços realizados
  status: 'Em Andamento' | 'Concluída' | 'Aguardando Peças' // Status da ordem
  feedback?: string // Feedback ou notas sobre a ordem de serviço (opcional)
}
