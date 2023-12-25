export interface TrafficFine {
  id: string // Identificador único da multa
  vehicleId: string // ID do veículo relacionado à multa
  driverId: string // ID do motorista responsável pela multa
  fineDate: Date // Data da multa
  fineAmount: number // Valor da multa
  description: string // Descrição da multa
  isPaid: boolean // Indica se a multa foi paga
}
