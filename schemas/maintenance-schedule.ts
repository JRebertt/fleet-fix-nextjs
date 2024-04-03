import * as z from 'zod'

export const MaintenanceScheduleSchema = z.object({
  title: z.string(),
  scheduledDate: z.date(),
  status: z
    .enum([
      'Scheduled',
      'InProgress',
      'OnHold',
      'Completed',
      'Canceled',
      'Failed',
    ])
    .default('Scheduled'),
  description: z.string().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  cost: z.number().nullable(),
  vehicle_id: z.string(),
})
