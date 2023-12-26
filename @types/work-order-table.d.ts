export interface WorkOrder {
  id: string // Identificador único da ordem de serviço
  workshopId: string // ID da oficina responsável
  vehicleId: string // ID do veículo em serviço
  mechanicAssigned: string // Mecânico atribuído à ordem
  entryDate: Date // Data de entrada da ordem de serviço
  status: 'Em Andamento' | 'Concluída' | 'Aguardando Peças' // Status da ordem
}
