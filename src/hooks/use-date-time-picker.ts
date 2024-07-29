import { useState } from 'react'

export function useDateTimePicker(defaultValue?: Date) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    defaultValue,
  )

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  return {
    selectedDate,
    handleDateChange,
  }
}
