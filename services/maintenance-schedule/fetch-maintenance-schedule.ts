'use server'
import {
  GetMaintenanceSchedule,
  MaintenanceResponse,
} from '@/@types/maintenance-table'
import { api } from '@/lib/api-fetch'
import { COOKIE_NAME } from '@/lib/cookies'
import { cookies } from 'next/headers'

export default async function fetchMaintenanceSchedule(): Promise<
  GetMaintenanceSchedule[]
> {
  const cookieStore = cookies()

  const token = cookieStore.get(COOKIE_NAME)
  const res = await api(`/maintenances`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token?.value}`,

      'Content-Type': 'application/json',
    },
  })

  const { maintenances }: MaintenanceResponse = await res.json()

  return maintenances || []
}
