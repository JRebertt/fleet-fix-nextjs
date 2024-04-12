'use client'

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'

import notifications from '@/utils/ notifications'
import { useMutation } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'

interface DropDownMenuItemAcionProps {
  id: string
  router: (id: string) => Promise<string | number>
  notifyName: string
}

export async function DropDownMenuItemAcion({
  id,
  router,
  notifyName,
}: DropDownMenuItemAcionProps) {
  const { mutateAsync: routerFn } = useMutation({
    mutationFn: router,
  })

  async function handlerRemoveItem(id: string, notify: string) {
    try {
      toast.success(notifications.notify.delete.success)
      await routerFn(id)
    } catch (err) {
      toast.success(notifications.notify.delete.success)
    }
  }
  return (
    <DropdownMenuItem
      className="text-red-600 cursor-pointer"
      onClick={() => handlerRemoveItem(id, notifyName)}
    >
      Delete
      <DropdownMenuShortcut>
        <Trash size={16} />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}
