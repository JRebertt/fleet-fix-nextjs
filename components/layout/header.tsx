import { cn } from '@/lib/utils'
import { MobileSidebar } from '@/components/layout/mobile-sidebar'
import Link from 'next/link'
import { CarFront } from 'lucide-react'
import { UserNav } from '../user-nav'

import profileUser from '@/services/user/profile-user'

export default async function Header() {
  const { user } = await profileUser()

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          href={'/'}
          className="hidden items-center justify-between gap-2 md:flex"
        >
          <CarFront className="h-6 w-6" />
          <h1 className="text-lg font-semibold">Fleet Fix</h1>
        </Link>
        <div className={cn('block md:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav user={user} />
        </div>
      </nav>
    </div>
  )
}
