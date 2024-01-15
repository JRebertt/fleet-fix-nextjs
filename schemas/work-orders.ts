import * as z from 'zod'

export const WorkOrderSchema = z.object({
  id: z.string().optional(), // Validar como string
  workshopId: z.string(), // Validar como string
  vehicleId: z.string(), // Validar como string
  mechanicAssigned: z.string(), // Validar como string
  entryDate: z.string(), // Validar como string (formato de data)
  completionDate: z.string().optional(), // Validar como string opcional (formato de data)
  serviceDetails: z.array(z.string()), // Validar como array de strings
  status: z
    .enum(['Em Andamento', 'Concluída', 'Aguardando Peças'])
    .default('Em Andamento'), // Validar como enumeração
  feedback: z.string().optional(), // Validar como string opcional
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})
