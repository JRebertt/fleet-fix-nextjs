import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
import { Layout } from '@/components/layout'

export default function AppLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }
  return (
    <Layout>
      {children}
      {sheet}
    </Layout>
  )
}
