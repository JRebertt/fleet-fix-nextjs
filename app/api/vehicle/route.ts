import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/db/firebase/config'
import { vehicleSchema } from '@/schemas/vehicle'

export async function POST(request: Request) {
  try {
    const vehicle = await request.json()
    const { id } = vehicle

    const updatedVehicle = {
      ...vehicle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const docRef = doc(db, 'vehicles', id)

    const parseResult = vehicleSchema.safeParse(updatedVehicle)

    if (!parseResult.success) {
      console.log(parseResult.error.format())
      return new Response(
        JSON.stringify({
          error: 'Dados inválidos',
          details: parseResult.error,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    await setDoc(docRef, updatedVehicle)

    return new Response(
      JSON.stringify({
        message: 'Veiculo adicionado com sucesso',
        id,
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
      JSON.stringify({ error: 'Erro ao adicionar Veiculo', details: e }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
