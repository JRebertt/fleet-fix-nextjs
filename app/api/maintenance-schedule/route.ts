import { StatusChange } from '@/@types/maintenance.table'
import { db } from '@/db/firebase/config'
import { MaintenanceScheduleSchema } from '@/schemas/maintenance-schedule'
import { randomUUID } from 'crypto'
import { doc, setDoc, collection, getDocs } from 'firebase/firestore'
import { z } from 'zod'

export async function GET() {
  try {
    // Recupera todos os documentos da coleção 'maintenanceSchedules'
    const querySnapshot = await getDocs(collection(db, 'maintenanceSchedules'))
    const maintenanceSchedules = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Retorna a lista de agendamentos de manutenção
    return new Response(JSON.stringify(maintenanceSchedules), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    // Retorna um erro em caso de falha no processo
    return new Response(
      JSON.stringify({
        error: 'Erro ao ler agendamentos de manutenção',
        details: e,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

// Gabiarra para aceitar o scheduleDate como string, pois inicialmente vem como data e depois na funcao passa para string

const ExtendedMaintenanceScheduleSchema = MaintenanceScheduleSchema.extend({
  scheduledDate: z.string(),
})
type ExtendedMaintenanceScheduleSchemaTypes = z.infer<
  typeof ExtendedMaintenanceScheduleSchema
>
export async function POST(request: Request) {
  try {
    const scheduleData = await request.json()

    const uuid = randomUUID()

    const initialStatusChange: StatusChange = {
      status: scheduleData.status, // ou um status padrão, como 'Agendada'
      changedAt: new Date().toISOString(),
      reason: 'Criação inicial do agendamento',
    }
    const newSchedule: ExtendedMaintenanceScheduleSchemaTypes = {
      id: uuid,
      ...scheduleData,
      statusChangeHistory: [initialStatusChange],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const validationResult =
      ExtendedMaintenanceScheduleSchema.safeParse(newSchedule)

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          error: 'Dados de agendamento inválidos',
          details: validationResult.error.format(),
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const newScheduleRef = doc(db, 'maintenanceSchedules', uuid)
    await setDoc(newScheduleRef, validationResult.data)

    return new Response(
      JSON.stringify({
        message: 'agendamento adicionado com sucesso',
        data: validationResult.data,
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: 'Erro ao criar agendamento de manutenção',
        details: e,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
