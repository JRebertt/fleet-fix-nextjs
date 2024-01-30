import { db } from '@/db/firebase/config'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'

import { createId } from '@paralleldrive/cuid2'
import { PaymentSchemas } from '@/schemas/payment'

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'payments'))

    const maintenanceSchedulesPayment = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return new Response(JSON.stringify(maintenanceSchedulesPayment), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro ao ler itens', details: e }),
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
    const paymentDetails = await request.json()
    const cuid = createId()
    const newPayment = {
      id: cuid,
      ...paymentDetails,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const validationResult = PaymentSchemas.safeParse(newPayment)

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          message: 'Erro ao validar dados de pagamento',
          data: validationResult.error.format(),
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const docRef = doc(db, 'payments', cuid)
    await setDoc(docRef, newPayment)

    return new Response(
      JSON.stringify({
        message: 'Pagamento registrado com sucesso',
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
      JSON.stringify({ error: 'Erro ao registrar pagamento', details: e }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
