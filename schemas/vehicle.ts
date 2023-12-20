import * as z from 'zod'
export const vehicleFormSchema = z.object({
  id: z.string().uuid(),
  model: z
    .string()
    .min(4, 'Mínimo 4 caracteres')
    .max(20, 'Máximo 20 caracteres'), // Modelo do veículo
  licensePlate: z
    .string()
    .min(7, 'Mínimo 7 caracteres')
    .max(7, 'Máximo 7 caracteres'), // Placa do veículo
  chassisNumber: z
    .string()
    .min(17, 'Mínimo 17 caracteres')
    .max(17, 'Máximo 17 caracteres'), // Número do chassi do veículo
  year: z.number().min(4, 'Mínimo 4 caracteres').max(4, 'Máximo 4 caracteres'), // Ano de fabricação do veículo
  photos: z.array(z.string()).optional(), // URLs das fotos do veículo
  purchaseDate: z.string().optional(), // Data em que o veículo foi comprado
  licensingDate: z.date().optional(), // Data do licenciamento do veículo
  renavamNumber: z
    .string()
    .min(9, 'Mínimo 9 caracteres')
    .max(11, 'Máximo 11 caracteres'), // Número do RENAVAM do veículo
  crlvPdf: z.string().optional(), // URL ou caminho para o PDF do Certificado de Registro e Licenciamento de Veículo
  crlveNumber: z
    .string()
    .min(10, 'Mínimo 10 caracteres')
    .max(12, 'Máximo 12 caracteres'), // Número do CRLVe do veículo
  driver: z.string(), // ID do motorista associado ao veículo
  vehicleStatus: z.enum(['Em Viagem', 'Em Manutenção', 'Revisado']), // Status atual do veículo
  currentMileage: z.number(), // Quilometragem atual do veículo
  createdAt: z.date(), // Data de criação do cadastro
  updatedAt: z.date(), // Data de atualização do cadastro
})
