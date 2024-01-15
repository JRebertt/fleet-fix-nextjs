import * as z from 'zod'

export const driverSchema = z.object({
  id: z.string().uuid().optional(),
  nickname: z.string(),
  fullName: z.string(),
  company: z.string(),
  dateOfBirth: z.string(), // Você pode querer usar z.date() se estiver trabalhando com objetos Date
  driverLicenseNumber: z.string(),
  cpf: z.string(),
  hireDate: z.string(), // Similarmente, z.date() pode ser adequado aqui
  contactNumber: z.string(),
  driverPhoto: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})
