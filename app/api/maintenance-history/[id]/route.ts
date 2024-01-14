/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '@/db/firebase/config'
import { addDoc, collection } from 'firebase/firestore'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    const maintenanceData = await request.json()
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID não fornecido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    const maintenanceCollectionRef = collection(
      db,
      'vehicles',
      id,
      'maintenanceHistory',
      id,
    )
    const maintenanceDocRef = await addDoc(
      maintenanceCollectionRef,
      maintenanceData,
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Não foi possível encontrar a colecao',
      }),
    )
  }
}
