import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/db/firebase/config'
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  try {
    const vehicle = await request.json()
    const { id } = vehicle
    const docRef = doc(db, 'vehicles', id)
    await setDoc(docRef, vehicle)
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
