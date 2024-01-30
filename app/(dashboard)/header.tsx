'use client'

import * as React from 'react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ScheduleForm from './schedule-form'

const filterSchema = z.object({
  name: z.string(),
})

type Checked = DropdownMenuCheckboxItemProps['checked']

export function Header() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(false)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(filterSchema),
  })

  function onSubmit(value: any) {
    console.log(value)
  }

  return (
    <section className="flex justify-between w-full gap-2">
      <form
        className="w-full max-w-96 flex space-x-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <Input
          className="w-full"
          placeholder="Buscar..."
          {...register('name')}
        /> */}

        {/* <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filtro</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Prioridade</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
                disabled
              >
                Alta
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
                disabled
              >
                Media
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                disabled
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                Baixa
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </form>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Agendar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Item</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <ScheduleForm />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
