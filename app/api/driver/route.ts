import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '@/db/firebase/config'
import { Driver } from '@/@types/driver-table'
import { randomUUID } from 'crypto'
import { driverSchema } from '@/schemas/driver'

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'drivers'))
    const driver = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return new Response(JSON.stringify(driver), {
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
    const driver: Driver = await request.json()
    const uuid = randomUUID()
    const newDriver = {
      id: uuid,
      ...driver,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const validationResult = driverSchema.safeParse(newDriver)

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          message: 'Error ao Validadar dados',
          data: validationResult.error.format(),
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const docRef = doc(db, 'drivers', uuid)
    await setDoc(docRef, driver)

    return new Response(
      JSON.stringify({
        message: 'Motorista adicionado com sucesso',
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
      JSON.stringify({ error: 'Erro ao adicionar Motorista', details: e }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
