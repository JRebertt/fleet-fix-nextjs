import * as z from 'zod'

const SocialMediaSchema = z.object({
  name: z.string(),
  url: z.string(),
})

const AddressSchema = z.object({
  street: z.string(),
  number: z.number(),
  complement: z.string().optional(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
})

export const CompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  cnpj: z.string(),
  address: AddressSchema,
  socialMedia: z.array(SocialMediaSchema),
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
  createdAt: z.string(),
  updatedAt: z.string(),
})
