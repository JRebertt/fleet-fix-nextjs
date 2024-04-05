import { ReactNode } from 'react'
import Header from './header'

export default function VehicleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full p-6 space-y-12">
      <Header />
      {children}
    </div>
  )
}
