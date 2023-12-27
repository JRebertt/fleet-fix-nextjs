import { DataTable } from '@/components/data-table'
import { Toaster } from '@/components/ui/sonner'
import { columns } from './columns'
import { CheckCheckIcon } from 'lucide-react'
import { Driver } from '@/@types/driver-table'

export default async function DriverPage() {
  const exempleDriver: Driver[] = [
    {
      id: '12345',
      contactNumber: '11987654321',
      driverLicenseNumber: 'AB123456789',
      cpf: '123.456.789-00',
      updatedAt: '2021-01-10T08:30:00',
      fullName: 'Carlos da Silva',
      nickname: 'SpeedyGonzalez',
      dateOfBirth: '1980-04-15',
      createdAt: '2020-05-01T12:00:00',
      driverPhoto: 'http://example.com/photo.jpg',
      company: 'ID-DA-EMPRESA',
      hireDate: '2020-05-01',
    },
  ]
  return (
    <>
      <section className="py-12">
        <Toaster />

        <div className="container">
          <h1 className="text-3xl font-bold pb-6">Motorista</h1>
          <DataTable
            columns={columns}
            data={exempleDriver}
            formComponent={<CheckCheckIcon />}
          />
        </div>
      </section>
    </>
  )
}
