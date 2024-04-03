import * as z from 'zod'

export const CompanySchema = z.object({
  name: z.string().min(1),
  cnpj: z.string(),
  contact_number: z.string(),
  contact_email: z.string(),
})
