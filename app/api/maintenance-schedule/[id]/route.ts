import { db } from '@/db/firebase/config'
import { MaintenanceScheduleSchema } from '@/schemas/maintenance-schedule'
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id
    if (!id) {
      return new Response(
        JSON.stringify({ error: 'ID do agendamento não fornecido' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const docRef = doc(db, 'maintenanceSchedules', id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return new Response(
        JSON.stringify({ error: `Agendamento com ID ${id} não encontrado` }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const maintenanceSchedulesData = docSnap.data()

    return new Response(JSON.stringify(maintenanceSchedulesData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro interno ao buscar agendamento' }),
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
