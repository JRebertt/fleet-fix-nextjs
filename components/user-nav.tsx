'use client'

import { ProfileUser } from '@/@types/users'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AuthContext } from '@/context/auth-context'
import { useContext } from 'react'

export function UserNav() {
  const { user, signOut } = useContext(AuthContext)

  const getInitials = (name: string) => {
    const names = name.split(' ')
    const initials = names.map((n) => n[0]).join('')
    return initials.toUpperCase()
  }

  // This function safely tries to get initials or returns 'NN' if user is null or name is missing
  const safeGetInitials = (user: ProfileUser | null) => {
    if (user && user.name) {
      return getInitials(user.name)
    }
    return 'NN'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>{safeGetInitials(user)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 items-center">
            <p className="text-sm font-medium leading-none">
              {user?.name || 'Nome não encontrado'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || 'Email não encontrado'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">Perfil</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
