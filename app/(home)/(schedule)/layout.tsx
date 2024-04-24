import { ReactNode } from 'react'
import { FiltersProvider } from '@/context/useFilter'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full space-y-4 p-6">
      <FiltersProvider>{children}</FiltersProvider>
    </div>
  )
}
