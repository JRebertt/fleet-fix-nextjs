import { MaintenanceHistorySchema } from '@/schemas/maintenance-history'
import { randomUUID } from 'crypto'
import { doc, setDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/db/firebase/config'
import { MaintenanceHistory } from '@/@types/maintenance.table'

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'maintenanceHistory'))
    const maintenanceHistory = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return new Response(JSON.stringify(maintenanceHistory), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: 'Erro ao ler histórico de manutenção',
        details: e,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const historyData: MaintenanceHistory = await request.json()
    const { id: vehicleID } = params
    const uuid = randomUUID()

    const newHistory = {
      id: uuid,
      ...historyData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const validationResult = MaintenanceHistorySchema.safeParse(newHistory)

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          error: 'Dados de histórico de manutenção inválidos',
          details: validationResult.error.format(),
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
    }

    console.log(JSON.stringify(validationResult))

    const newHistoryRef = doc(collection(db, 'maintenanceHistory'), uuid)
    await setDoc(newHistoryRef, validationResult.data)

    return new Response(
      JSON.stringify({
        message: 'Histórico de manutenção adicionado com sucesso',
        data: validationResult.data,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: 'Erro ao criar histórico de manutenção',
        details: e,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
