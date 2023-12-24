import { db } from '@/db/firebase/config'
import { deleteDoc, doc } from 'firebase/firestore'
import { revalidateTag } from 'next/cache'

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
    revalidateTag('collection')
    return new Response(
      JSON.stringify({ message: 'Veículo deletado com sucesso' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro ao deletar veículo', details: e }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
