import { db } from '@/db/firebase/config'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    if (!id) {
      throw new Error('ID do pagamento não fornecido')
    }

    const docRef = doc(db, 'payments', id)
    await deleteDoc(docRef)

    return new Response(
      JSON.stringify({ message: 'Pagamento deletado com sucesso' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro ao deletar pagamento', details: e }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    if (!id) {
      throw new Error('ID do pagamento não fornecido')
    }

    const data = await request.json()

    const docRef = doc(db, 'payments', id)
    await updateDoc(docRef, data)

    return new Response(
      JSON.stringify({ message: 'Pagamento atualizado com sucesso' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro ao atualizar pagamento', details: e }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
