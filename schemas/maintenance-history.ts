import * as z from 'zod'

const AttachmentSchema = z.object({
  type: z.enum(['Image', 'Document']), // Validar como enumeração
  url: z.string(), // Validar como string
  description: z.string().optional(), // Campo opcional
})

export const MaintenanceHistorySchema = z.object({
  id: z.string().uuid(), // Validar como string
  vehicleId: z.string(), // Validar como string
  maintenanceDate: z.string(), // Validar como string (formato de data)
  description: z.string(), // Validar como string
  serviceCost: z.number(), // Validar como número
  mileageAtMaintenance: z.number(), // Validar como número
  serviceOrderId: z.string().optional(), // Validar como string opcional
  serviceType: z.enum(['Preventiva', 'Corretiva', 'Emergencial']), // Validar como enumeração
  attachments: z.array(AttachmentSchema).optional(), // Array de Attachment, opcional
  createdAt: z.string(), // Validar como string (formato de data)
  updatedAt: z.string(), // Validar como string (formato de data)
})
