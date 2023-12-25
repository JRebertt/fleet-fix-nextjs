import { db } from '@/db/firebase/config'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'company'))
    const company = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return new Response(JSON.stringify(company), {
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
    const company = await request.json()
    const { id } = company
    const docRef = doc(db, 'company', id)
    await setDoc(docRef, company)

    return new Response(
      JSON.stringify({
        message: 'Empresa adicionado com sucesso',
        id,
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erro ao adicionar Empresa', details: error }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
