'use client'
import React, { useState } from 'react'
import { SideNav } from '@/components/layout/side-nav'
import { NavItems } from '@/components/constants/side-nav'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/hooks/use-sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react'
import { ThemeSwitcher } from '../theme/theme-switcher'

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const { isOpen, toggle } = useSidebar()
  const [swith, setSwitch] = useState(false)

  const handleToggle = () => {
    setSwitch(true)
    toggle()
    setTimeout(() => setSwitch(false), 500)
  }
  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-16 md:block`,
        swith && 'duration-500',
        isOpen ? 'w-72' : 'w-[78px]',
        className,
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <SideNav
              className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
              items={NavItems}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <Separator />

        <div
          className={cn(
            'items-center p-4 transition-all',
            isOpen
              ? 'flex flex-row justify-between space-x-4'
              : 'flex flex-col space-y-4',
          )}
        >
          <ThemeSwitcher />
          <Button
            onClick={handleToggle}
            variant={'ghost'}
            className="h-10 w-10"
            size={'icon'}
          >
            {isOpen ? (
              <PanelLeftCloseIcon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <PanelLeftOpenIcon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  )
}
