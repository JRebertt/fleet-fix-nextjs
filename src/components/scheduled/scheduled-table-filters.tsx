'use client'

import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import type { FormEvent } from 'react'

export function ScheduledTableFilters() {
  // FIXME: This will cause a hydration error.

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const params = new URLSearchParams()

    formData.forEach((value, key) => {
      if (value) {
        params.set(key, value.toString())
      }
    })

    replace(`${pathname}?${params.toString()}`)
  }

  const handleClearFilter = () => {
    replace(pathname)
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        name="vehicle"
        id="vehicle"
        defaultValue={searchParams.get('vehicle') ?? ''}
        placeholder="Placa do veículo"
        className="h-8 w-auto"
      />
      <Input
        placeholder="Título do agendamento"
        defaultValue={searchParams.get('title')?.toString()}
        className="h-8 w-[320px]"
        name="title"
        id="title"
      />
      <Select name="status" defaultValue={searchParams.get('status') ?? 'All'}>
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">Todos status</SelectItem>
          <SelectItem value="Scheduled">Agendado</SelectItem>
          <SelectItem value="InProgress">Em Progresso</SelectItem>
          <SelectItem value="OnHold">Em Espera</SelectItem>
          <SelectItem value="Completed">Concluído</SelectItem>
          <SelectItem value="Canceled">Cancelado</SelectItem>
          {/* <SelectItem value="Failed">Falhou</SelectItem> */}
        </SelectContent>
      </Select>
      <Button variant="secondary" size="xs" type="submit">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button
        variant="outline"
        size="xs"
        type="button"
        onClick={handleClearFilter}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
