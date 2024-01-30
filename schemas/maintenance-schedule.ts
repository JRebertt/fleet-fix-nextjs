import * as z from 'zod'

const StatusChangeSchema = z.object({
  status: z.enum(['Agendado', 'Concluído', 'Cancelado', 'Em Manutenção']),
  changedAt: z.string(),
  reason: z.string().optional(),
})

const ServiceListSchema = z.object({
  title: z.string(),
  checked: z.boolean(),
})

export const MaintenanceScheduleSchema = z.object({
  id: z.string().cuid2().optional(),
  vehicleId: z.string({
    required_error: 'Por favor, selecione um veículo para exibir.',
  }),
  scheduledDate: z.date(),
  description: z.string(),
  priority: z.enum(['Alta', 'Média', 'Baixa']).default('Baixa'),
  contactPerson: z.string().optional(),
  status: z.enum(['Agendado', 'Concluído', 'Cancelado', 'Em Manutenção']),
  statusChangeHistory: z.array(StatusChangeSchema),
  startDate: z.string().optional(),
  completionDate: z.string().optional(),
  mechanicAssigned: z.string().optional(),
  workshopId: z.string(),
  serviceList: z.array(ServiceListSchema).optional(),
  feedback: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})
