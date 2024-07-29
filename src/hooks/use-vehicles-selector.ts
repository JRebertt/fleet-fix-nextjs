import { useEffect, useState } from 'react'
import { getVehicles } from '@/http/vehicles/get-vehicles'

export function useVehicles() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const { vehicles } = await getVehicles()
        setVehicles(vehicles as never)
      } catch (error) {
        console.error('Failed to fetch vehicles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  return { vehicles, loading }
}
