export interface Vehicle {
  id?: string // Identificador único para cada veículo
  model: string // Modelo do veículo
  licensePlate: string // Placa do veículo
  chassisNumber: string // Número do chassi do veículo
  year: string // Ano de fabricação do veículo
  photos: string[] // URLs das fotos do veículo
  purchaseDate: string // Data em que o veículo foi comprado
  renavamNumber: string
  crlveNumber?: string
  driver: string // ID do motorista associado ao veículo
  vehicleStatus: 'Em Viagem' | 'Em Manutenção' | 'Revisado' // Status atual do veículo (em viagem, em manutenção, revisado)
  currentMileage: string // Kilometragem atual do veículo
  createdAt?: string // Data de criação do cadastro
  updatedAt?: string // Data de atualização do cadastro
  // licensingDate: Date // Data do licenciamento do veículo
  // crlvPdf: string // URL ou caminho para o PDF do Certificado de Registro e Licenciamento de Veículo
  // oilChangeDate: Date // Data da última troca de óleo do veículo
  // oilChangeMileage: number // Kilometragem do veículo na última troca de óleo
}
