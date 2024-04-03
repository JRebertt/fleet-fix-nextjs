export interface Vehicle {
  id: string
  make: string
  model: string
  year: string
  licensePlate: string
  vin: string
  driver_id: string
  company_id: string
}

export interface VehicleResponse {
  vehicle: Vehicle
}
