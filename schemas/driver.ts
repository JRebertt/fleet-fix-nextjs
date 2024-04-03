import * as z from 'zod'

export const driverSchema = z.object({
  user_id: z.string(),
  cpf: z.string(),
  contact_number: z.string().nullable(),
  birthDate: z.coerce.date().nullable(),
  licenseNumber: z.string().nullable(),
  licenseExpiry: z.coerce.date().nullable(),
  company_id: z.string(),
})
