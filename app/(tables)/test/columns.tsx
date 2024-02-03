'use client'

import { ColumnDef } from '@tanstack/react-table'

import { z } from 'zod'
import { vehicleSchema } from '@/schemas/vehicle'

type VehicleValues = z.infer<typeof vehicleSchema>

export const columns: ColumnDef<VehicleValues>[] = [
  {
    accessorKey: 'model',
    header: 'Modelo',
  },
  {
    accessorKey: 'licensePlate',
    header: 'Placa',
  },
]
