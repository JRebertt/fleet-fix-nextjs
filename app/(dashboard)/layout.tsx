import { ReactNode } from 'react'
import { Header } from './header'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full space-y-4 p-6">
      <Header />
      {children}
    </div>
  )
}
