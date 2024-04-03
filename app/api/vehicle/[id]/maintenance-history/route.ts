import { MaintenanceHistorySchema } from '@/schemas/maintenance-history'
import { randomUUID } from 'crypto'
import { doc, setDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/db/firebase/config'
import { MaintenanceHistory } from '@/@types/maintenance-table'

// Capturando dados do veiculo e do historico
// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } },
// ) {
//   try {
//     const { id: vehicleId } = params
//     const vehicleRef = doc(db, 'vehicles', vehicleId)
//     const vehicleDoc = await getDoc(vehicleRef)

//     if (!vehicleDoc.exists()) {
//       throw new Error('Veículo não encontrado')
//     }

//     const vehicleData = vehicleDoc.data()
//     const vehicleValidation = vehicleSchema.safeParse(vehicleData)
//     if (!vehicleValidation.success) {
//       // Tratar erro de validação do veículo
//     }

//     const maintenanceHistoryRef = collection(vehicleRef, 'maintenanceHistory')
//     const querySnapshot = await getDocs(maintenanceHistoryRef)
//     const maintenanceHistory = querySnapshot.docs.map((doc) => doc.data())

//     const maintenanceHistoryValidation =
//       MaintenanceHistorySchema.safeParse(maintenanceHistory)
//     if (!maintenanceHistoryValidation.success) {
//       // Tratar erro de validação do histórico de manutenção
//     }

//     return new Response(
//       JSON.stringify({
//         vehicleData: vehicleValidation.data,
//         maintenanceHistory: maintenanceHistoryValidation.data,
//       }),
//       {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       },
//     )
//   } catch (e) {
//     return new Response(
//       JSON.stringify({
//         error: 'Erro ao obter dados do veículo e histórico de manutenção',
//         details: e,
//       }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } },
//     )
//   }
// }

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id: vehicleId } = params

    // Criando uma referência para a subcoleção
    const maintenanceHistoryRef = collection(
      db,
      `vehicles/${vehicleId}/maintenanceHistory`,
    )

    // Obtendo os documentos da subcoleção
    const querySnapshot = await getDocs(maintenanceHistoryRef)
    const maintenanceHistory = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return new Response(JSON.stringify(maintenanceHistory), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: 'Erro ao obter histórico de manutenção',
        details: e,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const historyData: MaintenanceHistory = await request.json()
    const { id: vehicleID } = params

    const uuid = randomUUID()

    console.log(uuid)

    // Gera um ID único para o novo histórico de manutenção
    const newHistory = {
      id: uuid,
      ...historyData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Valida os dados do histórico de manutenção
    const validationResult = MaintenanceHistorySchema.safeParse(newHistory)

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          error: 'Falha na validação dos dados',
          message: validationResult.error.format(),
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    // Cria uma referência para a subcoleção de histórico de manutenção do veículo
    const newHistoryRef = doc(
      collection(doc(db, 'vehicles', vehicleID), 'maintenanceHistory'),
      uuid,
    )

    // Adiciona o novo histórico de manutenção ao Firestore
    await setDoc(newHistoryRef, validationResult.data)

    return new Response(
      JSON.stringify({
        message: 'Histórico de manutenção adicionado com sucesso',
        data: validationResult.data,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: 'Erro ao criar histórico de manutenção',
        details: e,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
