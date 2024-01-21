import { Company } from '@/@types/company-table'
import { db } from '@/db/firebase/config'
import { CompanySchema } from '@/schemas/company'
import { randomUUID } from 'crypto'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'companies'))
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
    const company: Company = await request.json()

    const uuid = randomUUID()

    const newCompany = {
      id: uuid,
      ...company,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const validationResult = CompanySchema.safeParse(newCompany)

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          message: 'Error ao validar os dados',
          details: validationResult.error.format(),
        }),
        {
          status: 400,
        },
      )
    }

    const docRef = doc(db, 'companies', uuid)
    await setDoc(docRef, newCompany)

    return new Response(
      JSON.stringify({
        message: 'Empresa adicionado com sucesso',
        data: validationResult.data,
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
