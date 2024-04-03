'use client'
import { useState, useEffect } from 'react'
import { CarFront, MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SideNav } from '@/components/layout/side-nav'
import { NavItems } from '@/components/constants/side-nav'
import { ModeToggle } from '../mode-toggle'

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div className="flex items-center justify-center gap-2">
            <MenuIcon />
            <div className="flex gap-4">
              <CarFront className="h-6 w-6" />
              <h1 className="text-lg font-semibold">Fleet fix</h1>
            </div>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <div className="block sm:hidden">
            <ModeToggle />
          </div>
          <div className="px-1 py-6 pt-16">
            <SideNav items={NavItems} setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
