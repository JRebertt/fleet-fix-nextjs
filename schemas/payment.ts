import { z } from 'zod'

export const PaymentSchema = z.object({
  amount: z.coerce.number(),
  description: z.string().nullable(), // aceita string ou null
  paymentDate: z.date().nullable(), // aceita Date ou null
  paymentMethod: z
    .enum(['Card', 'Boleto', 'Transfer', 'Cash', 'Pix'])
    .default('Cash'), // usando o enum definido acima
  status: z
    .enum(['Pending', 'Completed', 'Canceled', 'Failed', 'InProcess', 'OnHold'])
    .default('Pending'), // usando o enum definido acima
  maintenance_id: z.string().nullable(),
})
