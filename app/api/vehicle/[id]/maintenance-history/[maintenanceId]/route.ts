import { db } from '@/db/firebase/config'
import { addDoc, collection } from 'firebase/firestore'

export async function GET(
  request: Request,
  { params }: { params: { id: string; maintenanceId: string } },
) {
  try {
    const { id: vehicleId, maintenanceId } = params

    if (!maintenanceId) {
      return new Response(JSON.stringify({ error: 'ID não fornecido' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    return new Response(JSON.stringify({ vehicleId, maintenanceId }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
    // const maintenanceCollectionRef = collection(db, 'vehicles', vehicleId, 'maintenanceHistory', id);
    // const maintenanceDocRef = await addDoc(maintenanceCollectionRef, maintenanceData);
  } catch (e) {
    return new Response(JSON.stringify({ error: e }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
