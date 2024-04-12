import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Providers } from './providers'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { AuthProvider } from '@/context/auth-context'
import { Toaster } from '@/components/ui/toaster'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s | nortegases',
    default: 'nortegases',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className} lang="en" suppressHydrationWarning={true}>
      <body className="text-foreground bg-background antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <AuthProvider>{children}</AuthProvider>
            <SpeedInsights />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
