import { format, formatISO, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { z } from 'zod'

const formatSchema = z.object({
  formatDate: z
    .enum(['dd/MM/yyyy', 'dd/MM/yyyy HH:mm:ss'])
    .default('dd/MM/yyyy'),
})

type formatSchemaValues = z.infer<typeof formatSchema>

export function formatDates(
  dateString: string | Date,
  { formatDate }: formatSchemaValues,
) {
  const dateObject = new Date(dateString)

  const formattedDate = format(dateObject, formatDate) // Format: '20/01/2024'

  const longFormattedDate = format(dateObject, 'PPPPp', { locale: ptBR }) // Format: 'Saturday, January 20th, 2024 at 15:45'
  const isoFormattedDate = formatISO(dateObject) // ISO Format: '2024-01-20T15:45:30Z'
  const timeUntilNow = formatDistanceToNow(dateObject, {
    addSuffix: true,
    locale: ptBR,
  }) // 'in X time', depending on the current date

  return {
    formattedDate,
    longFormattedDate,
    isoFormattedDate,
    timeUntilNow,
  }
}
