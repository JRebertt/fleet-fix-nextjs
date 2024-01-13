import * as z from 'zod'

const StatusChangeSchema = z.object({
  status: z
    .enum(['Agendado', 'Cancelado', 'Em Manutenção', 'Concluído'])
    .default('Agendado'), // Validar como string
  changedAt: z.string().default(new Date().toISOString()), // Validar como string; pode ser formatado como data
  reason: z.string().optional(), // Campo opcional
})

export const MaintenanceScheduleSchema = z.object({
  id: z.string().uuid().optional(), // Validar como string
  vehicleId: z.string(), // Validar como string
  scheduledDate: z.date(), // Validar como string; pode ser formatado como data
  description: z.string(), // Validar como string
  priority: z.enum(['Alta', 'Média', 'Baixa', 'Normal']).default('Normal'), // Enumeração com valores específicos e opcional
  contactPerson: z.string().optional(), // Campo opcional
  statusChangeHistory: z.array(StatusChangeSchema), // Array de StatusChange
  status: z.enum(['Agendado', 'Concluído', 'Cancelado']).default('Agendado'), // Enumeração com valores específicos
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})
