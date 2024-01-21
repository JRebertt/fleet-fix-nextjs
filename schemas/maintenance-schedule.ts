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
  id: z.string().uuid().optional(),
  vehicleId: z.string(),
  scheduledDate: z.date(),
  title: z.string().optional(),
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
  payment: z.object({
    amount: z.string(), // Valor do pagamento
    paymentStatus: z.enum(['Pago', 'Pendente']).optional(), // Status do pagamento
    paymentMethod: z.enum(['Cartão de Crédito', 'Débito', 'Pix']).optional(), // Método de pagamento
    paymentedDate: z.string().optional(),
  }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})
