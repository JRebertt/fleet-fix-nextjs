'use client'

import { forwardRef } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Button } from './ui/button'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useDateTimePicker } from '@/hooks/use-date-time-picker'
import { Calendar } from './ui/calendar'
import { TimePicker } from './time-picker/time-picker'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

interface DateTimePickerProps {
  id: string
  name: string
  defaultValue?: Date
  onChange: (date: Date) => void
  includeTime?: boolean
}

const DateTimePickerRoot = forwardRef<HTMLDivElement, DateTimePickerProps>(
  ({ id, name, defaultValue, onChange, includeTime = true }, ref) => {
    const { selectedDate, handleDateChange } = useDateTimePicker(defaultValue)

    const onDateChange = (date: Date) => {
      handleDateChange(date)
      onChange(date)
    }

    return (
      <div ref={ref}>
        <Input
          type="hidden"
          name={name}
          id={id}
          value={selectedDate ? selectedDate.toISOString() : ''}
        />

        <Popover>
          <DateTimePickerTrigger className="space-x-2">
            <span>
              {selectedDate
                ? includeTime
                  ? format(selectedDate, 'PPP p', { locale: ptBR })
                  : format(selectedDate, 'PPP', { locale: ptBR })
                : 'Selecione uma data'}
            </span>
            <CalendarIcon className="size-4" />
          </DateTimePickerTrigger>
          <DateTimePickerContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              locale={ptBR}
              onSelect={(date) => {
                if (date) {
                  onDateChange(date)
                }
              }}
            />
            {includeTime && (
              <TimePicker
                date={selectedDate || new Date()}
                setDate={(date) => {
                  if (date) {
                    onDateChange(date)
                  }
                }}
              />
            )}
          </DateTimePickerContent>
        </Popover>
      </div>
    )
  },
)

DateTimePickerRoot.displayName = 'DateTimePickerRoot'

const DateTimePickerTrigger = forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <PopoverTrigger asChild>
    <Button
      ref={ref}
      variant="outline"
      className={cn('w-full justify-between', className)}
      {...props}
    >
      {children}
    </Button>
  </PopoverTrigger>
))

DateTimePickerTrigger.displayName = 'DateTimePickerTrigger'

const DateTimePickerContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <PopoverContent ref={ref} className={cn('w-auto', className)} {...props}>
    {children}
  </PopoverContent>
))

DateTimePickerContent.displayName = 'DateTimePickerContent'

export {
  DateTimePickerRoot as DateTimePicker,
  DateTimePickerTrigger,
  DateTimePickerContent,
}
