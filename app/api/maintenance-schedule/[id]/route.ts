import { db } from '@/db/firebase/config'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    if (!id) {
      throw new Error('ID do documento não fornecido')
    }

    const docRef = doc(db, 'maintenanceSchedules', id)
    await deleteDoc(docRef)
    return new Response(
      JSON.stringify({ message: 'Agendamento deletado com sucesso' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro ao deletar Agendamento', details: e }),
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
      throw new Error('ID do documento não fornecido')
    }

    // Parse JSON body para obter os dados atualizados
    const data = await request.json()

    const docRef = doc(db, 'maintenanceSchedules', id)
    await updateDoc(docRef, data)
    return new Response(
      JSON.stringify({ message: 'Agendamento atualizado com sucesso' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro ao atualizar Agendamento', details: e }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
