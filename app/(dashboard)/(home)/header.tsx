'use client'

import React, { ChangeEvent } from 'react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ScheduleForm from './schedule-form'
import { Plus } from 'lucide-react'
import { useFilters } from '@/hooks/useFilter'

export function Header() {
  const { filters, setFilters } = useFilters()

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      searchText: event.target.value,
    })
  }

  const handleStatusChange = (
    statusKey: 'statusAgendado' | 'statusEmProgresso' | 'statusConcluido',
    isChecked: boolean,
  ) => {
    setFilters({
      ...filters,
      [statusKey]: isChecked,
    })
  }

  return (
    <section className="flex justify-between w-full gap-2">
      <section className="w-full max-w-96 flex space-x-2">
        <Input
          className="w-full"
          placeholder="Buscar..."
          value={filters.searchText}
          onChange={handleSearchTextChange}
        />

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Status do Agendamento</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filters.statusAgendado}
                onCheckedChange={(checked) =>
                  handleStatusChange('statusAgendado', checked)
                }
              >
                Agendado
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.statusEmProgresso}
                onCheckedChange={(checked) =>
                  handleStatusChange('statusEmProgresso', checked)
                }
              >
                Em Progresso
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.statusConcluido}
                onCheckedChange={(checked) =>
                  handleStatusChange('statusConcluido', checked)
                }
              >
                Concluído
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus />
          </Button>
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
