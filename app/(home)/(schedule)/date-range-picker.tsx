'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ptBR } from 'date-fns/locale'

interface DatePickerWithRangeProps {
  onChange: (range: DateRange | undefined) => void // Função para manipular mudanças
  value: DateRange | undefined // Valor atual do intervalo de datas
  className?: React.HTMLAttributes<HTMLDivElement>
}

export function DatePickerWithRange({
  onChange,
  value,
  className,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(value)

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate)
    onChange(newDate)
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              ' sm:w-60 justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y', { locale: ptBR })} -{' '}
                  {format(date.to, 'LLL dd, y', { locale: ptBR })}
                </>
              ) : (
                format(date.from, 'LLL dd, y', { locale: ptBR })
              )
            ) : (
              <span>Escolha o datas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
