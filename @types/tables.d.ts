export interface Vehicle {
  id: string // Identificador único para cada veículo
  model: string // Modelo do veículo
  licensePlate: string // Placa do veículo
  chassisNumber: string // Número do chassi do veículo
  year: number // Ano de fabricação do veículo
  photos: string[] // URLs das fotos do veículo
  purchaseDate: Date // Data em que o veículo foi comprado
  licensingDate: Date // Data do licenciamento do veículo
  crlvPdf: string // URL ou caminho para o PDF do Certificado de Registro e Licenciamento de Veículo
  driver: string // ID do motorista associado ao veículo
  vehicleStatus: 'Em Viagem' | 'Em Manutenção' | 'Revisado' // Status atual do veículo (em viagem, em manutenção, revisado)
  oilChangeDate: Date // Data da última troca de óleo do veículo
  oilChangeMileage: number // Kilometragem do veículo na última troca de óleo
  currentMileage: number // Kilometragem atual do veículo
}

export interface Driver {
  id: string // Identificador único para cada motorista
  nickname: string // Apelido do motorista
  fullName: string // Nome completo do motorista
  dateOfBirth: Date // Data de nascimento do motorista
  driverLicenseNumber: string // Número da CNH (Carteira Nacional de Habilitação) do motorista
  cpf: string // CPF (Cadastro de Pessoas Físicas) do motorista
  hireDate: Date // Data de entrada do motorista na empresa
  contactNumber: string // Número de contato do motorista
  driverPhoto: string // URL ou caminho para a foto do motorista
  profileUpdateDate: Date // Data da última atualização do perfil do motorista
}

export interface TrafficFine {
  id: string // Identificador único da multa
  vehicleId: string // ID do veículo relacionado à multa
  driverId: string // ID do motorista responsável pela multa
  fineDate: Date // Data da multa
  fineAmount: number // Valor da multa
  description: string // Descrição da multa
  isPaid: boolean // Indica se a multa foi paga
}

export interface Workshop {
  id: string // Identificador único da oficina
  workshopName: string // Nome da oficina
  workshopManager: string // Responsável pela oficina
  mechanicInService: string // Mecânico realizando serviço
  location: string // Local da oficina
  contactNumber: string // Número de contato da oficina
}

export interface PartsStore {
  id: string // Identificador único da loja de peças
  storeName: string // Nome da loja de peças
  salesmanName: string // Nome do vendedor
  location: string // Local da loja de peças
  salesmanContactNumber: string // Número de contato do vendedor
}

export interface WorkOrder {
  id: string // Identificador único da ordem de serviço
  workshopId: string // ID da oficina responsável
  vehicleId: string // ID do veículo em serviço
  mechanicAssigned: string // Mecânico atribuído à ordem
  entryDate: Date // Data de entrada da ordem de serviço
  status: 'Em Andamento' | 'Concluída' | 'Aguardando Peças' // Status da ordem
}

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
