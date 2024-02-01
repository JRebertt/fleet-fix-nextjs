import * as z from 'zod'

export const vehicleSchema = z.object({
  id: z.string().uuid().optional(),
  model: z
    .string()
    .toUpperCase()
    .min(4, 'Mínimo 4 caracteres')
    .max(20, 'Máximo 20 caracteres'), // Modelo do veículo
  // company: z.enum(['Norte Gases', 'SMTransportes', 'Particular']),
  company: z.string().optional(),
  licensePlate: z
    .string()
    .toUpperCase()
    .min(7, 'Mínimo 7 caracteres')
    .max(7, 'Máximo 7 caracteres'), // Placa do veículo
  chassisNumber: z
    .string()
    .min(17, 'Mínimo 17 caracteres')
    .max(17, 'Máximo 17 caracteres'), // Número do chassi do veículo
  year: z
    .string()
    .min(4, 'Mínimo 4 caracteres')
    .max(10, 'Máximo 10 caracteres'), // Ano de fabricação do veículo
  photos: z.array(z.string()), // URLs das fotos do veículo
  purchaseDate: z.string(), // Data em que o veículo foi comprado
  // licensingDate: z.date(), // Data do licenciamento do veículo
  renavamNumber: z
    .string()
    .min(9, 'Mínimo 9 caracteres')
    .max(11, 'Máximo 11 caracteres'), // Número do RENAVAM do veículo
  crlveNumber: z
    .string()
    .min(10, 'Mínimo 10 caracteres')
    .max(12, 'Máximo 12 caracteres')
    .optional(), // Número do CRLVe do veículo
  driver: z.string(), // ID do motorista associado ao veículo
  vehicleStatus: z.enum(['Em Viagem', 'Em Manutenção', 'Revisado']), // Status atual do veículo
  currentMileage: z.string(), // Quilometragem atual do veículo
  createdAt: z.string().optional(), // Data de criação do cadastro
  updatedAt: z.string().optional(), // Data de atualização do cadastro
})
