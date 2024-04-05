import { ReactNode } from 'react'
import { Header } from './header'
import { FiltersProvider } from '@/hooks/useFilter'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full space-y-4 p-6">
      <FiltersProvider>
        <Header />
        {children}
      </FiltersProvider>
    </div>
  )
}
