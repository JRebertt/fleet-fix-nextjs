import { z } from 'zod'

export const PaymentSchemas = z.object({
  id: z.string().cuid2().optional(),
  maintenanceSchedule: z.object({
    id: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  }),
  vehicle: z.object({
    id: z.string().optional(),
    model: z.string().optional(),
  }),
  payment: z.object({
    amount: z.string().optional(),
    paymentStatus: z.enum(['Pago', 'Pendente']).optional(),
    paymentMethod: z
      .enum(['Cartão de Crédito', 'Débito', 'Pix', 'Dinheiro', 'A Definir'])
      .default('A Definir')
      .optional(),
    paymentedDate: z.string().optional(),
  }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})
