'use client'

import { useState, ChangeEvent } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Input } from './ui/input'

interface Vehicle {
  id: string
  make: string
  model: string
  year: string
  licensePlate: string
  vin: string
  driverId: string
  companyId: string
}

interface VehicleSwitcherProps {
  id: string
  name: string
  vehicles: Vehicle[]
}

export default function VehicleSwitcher({
  vehicles,
  id,
  name,
}: VehicleSwitcherProps) {
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null)
  const [filter, setFilter] = useState<string>('')

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setCurrentVehicle(vehicle)
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.licensePlate.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <>
      <input
        type="hidden"
        id={id}
        name={name}
        value={currentVehicle ? currentVehicle.id : ''}
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full items-center gap-2 rounded border p-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary md:w-[168px]">
          {currentVehicle ? (
            <>
              <span className="truncate text-left">
                {currentVehicle.licensePlate}
              </span>
            </>
          ) : (
            <span className="text-muted-foreground">Escolha</span>
          )}
          <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          alignOffset={-16}
          sideOffset={12}
          className="max-h-[200px] w-[730px] overflow-auto md:w-[200px]"
        >
          <DropdownMenuGroup>
            <Input
              type="text"
              placeholder="Buscar..."
              className="mb-2"
              value={filter}
              onChange={handleFilterChange}
            />
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <DropdownMenuItem
                  key={vehicle.id}
                  onClick={() => handleVehicleSelect(vehicle)}
                >
                  <div className="flex w-full items-center justify-around">
                    <span className="line-clamp-1 flex-grow">
                      {vehicle.licensePlate}
                    </span>
                    {currentVehicle && currentVehicle.id === vehicle.id && (
                      <Check className="ml-2 h-4 w-4 text-green-500" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>
                <span>No vehicles found</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
