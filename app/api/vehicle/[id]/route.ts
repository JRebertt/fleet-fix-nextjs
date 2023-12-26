import { db } from '@/db/firebase/config'
import { vehicleSchema } from '@/schemas/vehicle'
import { deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id
    if (!id) {
      return new Response(
        JSON.stringify({ error: 'ID do veículo não fornecido' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const docRef = doc(db, 'vehicles', id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return new Response(
        JSON.stringify({ error: `Veículo com ID ${id} não encontrado` }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const vehicleData = docSnap.data()
    const vehicleDataValidated = vehicleSchema.safeParse(vehicleData)

    if (!vehicleDataValidated.success) {
      // Log de erro pode ser mais detalhado internamente
      return new Response(
        JSON.stringify({ error: 'Falha na validação dos dados do veículo' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    return new Response(JSON.stringify({ data: vehicleDataValidated.data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    // Log interno do erro
    return new Response(
      JSON.stringify({ error: 'Erro interno ao buscar veículo' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    if (!id) {
      throw new Error('ID do documento não fornecido')
    }

    const docRef = doc(db, 'vehicles', id)
    await deleteDoc(docRef)
    return new Response(
      JSON.stringify({ message: 'Veiculo deletado com sucesso' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro ao deletar Veiculo', details: e }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id
    if (!id) {
      throw new Error('ID do documento não fornecido')
    }

    const body = await request.json()
    const updateData = {
      ...body,
      updatedAt: new Date().toISOString(),
    }

    console.log()

    if (!body) {
      throw new Error('Dados para atualização não fornecidos')
    }

    const vehicleUpdateSchema = vehicleSchema.partial()

    const validationResult = vehicleUpdateSchema.safeParse(updateData)

    if (validationResult.success === false) {
      return new Response(
        JSON.stringify({ message: validationResult.error.format() }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
    const docRef = doc(db, 'vehicles', id)
    await updateDoc(docRef, updateData)

    return new Response(
      JSON.stringify({ message: 'Veiculo atualizada com sucesso' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro ao atualizar Veiculo', details: e }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
