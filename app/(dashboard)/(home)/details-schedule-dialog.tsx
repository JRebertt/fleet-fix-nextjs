'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export async function DetailsScheduleDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>Ver detalhes</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Item</DialogTitle>
          <DialogDescription>Preencha as informações abaixo.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
