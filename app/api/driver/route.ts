import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '@/db/firebase/config'

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'drivers'))
    const driver = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return new Response(JSON.stringify(driver), {
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

export async function POST(request: Request) {
  try {
    const driver = await request.json()
    const { id } = driver
    const docRef = doc(db, 'drivers', id)
    await setDoc(docRef, driver)

    return new Response(
      JSON.stringify({
        message: 'Motorista adicionado com sucesso',
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
      JSON.stringify({ error: 'Erro ao adicionar Motorista', details: e }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
