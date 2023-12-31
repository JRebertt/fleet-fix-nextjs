import * as z from 'zod'

const SocialMediaSchema = z.object({
  name: z.string().optional(),
  url: z.string().optional(),
})

const AddressSchema = z.object({
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
})

export const CompanySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  cnpj: z.string(),
  address: AddressSchema,
  socialMedia: z.array(SocialMediaSchema).optional(),
  contactPhone: z.string(),
  billingEmail: z.string().optional(),
  logisticsEmail: z.string(),
  corporateEmail: z.string(),
  financialEmail: z.string(),
  stateRegistration: z.string().optional(),
  responsiblePersonName: z.object({
    name: z.string(),
    contact: z.string(),
  }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})
