import * as z from 'zod'

export const vehicleSchema = z.object({
  make: z.string(),
  model: z.string(),
  year: z.string(),
  licensePlate: z.string(),
  vin: z.string(),
  company_id: z.string(),
  driver_id: z.string(),
})
