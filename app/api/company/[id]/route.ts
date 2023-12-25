import { db } from '@/db/firebase/config'
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id
    if (!id) {
      throw new Error('ID do documento não fornecido')
    }

    const docRef = doc(db, 'company', id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return new Response(JSON.stringify({ error: 'Empresa não encontrada' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const companyData = docSnap.data()

    return new Response(JSON.stringify({ data: companyData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro ao buscar Empresa', details: e }),
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

    // Obtendo os dados do corpo da requisição
    const body = await request.json()
    if (!body) {
      throw new Error('Dados para atualização não fornecidos')
    }

    const docRef = doc(db, 'company', id)
    await updateDoc(docRef, body) // Atualiza o documento com os novos dados

    return new Response(
      JSON.stringify({ message: 'Empresa atualizada com sucesso' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro ao atualizar Empresa', details: e }),
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

    const docRef = doc(db, 'company', id)
    await deleteDoc(docRef)
    return new Response(
      JSON.stringify({ message: 'Empresa deletado com sucesso' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro ao deletar Empresa', details: e }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
