import { WorkOrderSchema } from '@/schemas/work-orders'
import { randomUUID } from 'crypto'
import { db } from '@/db/firebase/config'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'

export async function GET(response: Response) {
  try {
    const querySnapshot = await getDocs(collection(db, 'workOrders'))
    const workOrders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return new Response(JSON.stringify(workOrders), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
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

export async function POST(request: Request) {
  try {
    const ordersData = await request.json()

    const uuid = randomUUID()

    const newOrder = {
      id: uuid,
      ...ordersData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const validationResult = WorkOrderSchema.safeParse(newOrder)

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          message: 'Error ao validar a ordem de serviço',
          details: validationResult.error.format(),
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const newOrderRef = doc(db, 'workOrders', uuid)

    await setDoc(newOrderRef, validationResult.data)

    return new Response(
      JSON.stringify({
        message: 'Ordem de serviço criada com sucesso ✅',
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
        error: 'Erro ao criar Ordem de serviço de manutenção',
        details: e,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
