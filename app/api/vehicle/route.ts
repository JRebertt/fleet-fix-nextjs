// import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '@/db/firebase/config'
// import { NextRequest, NextResponse } from 'next/server'

import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       // Aqui você pode extrair os dados do veículo do corpo da requisição
//       const vehicleData = req.body

//       // Adiciona o veículo ao Firestore
//       const docRef = await addDoc(collection(db, 'vehicles'), vehicleData)

//       res.status(201).json({ id: docRef.id, ...vehicleData })
//     } catch (e) {
//       res.status(500).json({ error: 'Erro ao criar o veículo', details: e })
//     }
//   } else {
//     // Método não suportado
//     res.setHeader('Allow', ['POST'])
//     res.status(405).end(`Method ${req.method} Not Allowed`)
//   }
// }

// export async function POST() {
//   return NextResponse.json({ name: 'Created Jon Doe' })
// }

export async function POST(request: Request) {
  try {
    const item = await request.json()
    const docRef = await addDoc(collection(db, 'test'), item)
    return new Response(
      JSON.stringify({ message: 'Item adicionado com sucesso', id: docRef.id }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Erro ao adicionar item', details: e }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'test'))
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return new Response(JSON.stringify(items), {
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
