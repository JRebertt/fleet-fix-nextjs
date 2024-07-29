'use client'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { Button } from './ui/button'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
}

export function Pagination({
  pageIndex,
  perPage,
  totalCount,
}: PaginationProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const pages = Math.ceil(totalCount / perPage) || 1

  const handlePaginate = (newPageIndex: number) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('page', newPageIndex.toString())
    router.push(`${pathname}?${newParams.toString()}`)
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handlePaginate(1)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            onClick={() => handlePaginate(pageIndex - 1)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            onClick={() => handlePaginate(pageIndex + 1)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pages <= pageIndex}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            onClick={() => handlePaginate(pages)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pages <= pageIndex}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
