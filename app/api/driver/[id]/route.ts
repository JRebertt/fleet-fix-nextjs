import { db } from '@/db/firebase/config'
import { driverSchema } from '@/schemas/driver'
import { deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id
    if (!id) {
      return new Response(
        JSON.stringify({ error: 'ID do Motorista não fornecido' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const docRef = doc(db, 'drivers', id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return new Response(
        JSON.stringify({ error: `Motorista com ID ${id} não encontrado` }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const driverData = docSnap.data()
    const driverDataValidated = driverSchema.safeParse(driverData)

    if (!driverDataValidated.success) {
      return new Response(
        JSON.stringify({ error: 'Falha na validação dos dados do Motorista' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    return new Response(JSON.stringify({ data: driverDataValidated.data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    // Log interno do erro
    return new Response(
      JSON.stringify({ error: 'Erro interno ao buscar Motorista' }),
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

    const docRef = doc(db, 'drivers', id)
    await deleteDoc(docRef)
    return new Response(
      JSON.stringify({ message: 'Motorista deletado com sucesso' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro ao deletar Motorista', details: e }),
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

    if (!body) {
      throw new Error('Dados para atualização não fornecidos')
    }

    const docRef = doc(db, 'drivers', id)
    await updateDoc(docRef, updateData)

    return new Response(
      JSON.stringify({ message: 'Motorista atualizada com sucesso' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro ao atualizar', details: e }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
