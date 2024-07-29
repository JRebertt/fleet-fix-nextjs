'use client'

import * as React from 'react'
import { Clock } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { TimePickerInput } from './time-picker-input'
import { currentLocale, labels } from '@/utils/locales'
import { Button } from '../ui/button'

interface TimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const localeLabels = labels[currentLocale]

  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)
  const secondRef = React.useRef<HTMLInputElement>(null)

  function currentTimer() {
    if (date) {
      const now = new Date()
      const updatedDate = new Date(date)
      updatedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds())
      setDate(updatedDate)
    }
  }

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          {localeLabels.hours}
        </Label>
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          {localeLabels.minutes}
        </Label>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="seconds" className="text-xs">
          {localeLabels.seconds}
        </Label>
        <TimePickerInput
          picker="seconds"
          date={date}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>

      <Button variant="outline" onClick={currentTimer}>
        <Clock className="size-4" />
      </Button>
    </div>
  )
}
