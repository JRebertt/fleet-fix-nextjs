import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/db/firebase/config'

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'vehicles'))
    const vehicles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    console.log(vehicles)
    return new Response(JSON.stringify(vehicles), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro ao ler itens', details: e }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
