import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface Props {
  title: string
  icon: LucideIcon
  amount: number | string
  isMoney: boolean
  percent?: string
}

export function CardMetrics({
  title,
  icon: Icon,
  amount,
  isMoney = false,
}: Props) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {isMoney
            ? amount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            : amount}
        </span>
        {/* <p className="text-xs text-muted-foreground">
          <span
            className={cn({
              'text-emerald-500 dark:text-emerald-400': customerChange >= 0,
              'text-rose-500 dark:text-rose-400': customerChange < 0,
            })}
          >
            {customerChange.toFixed(2)}%
          </span>
          em relação ao período anterior
        </p> */}
      </CardContent>
    </Card>
  )
}
