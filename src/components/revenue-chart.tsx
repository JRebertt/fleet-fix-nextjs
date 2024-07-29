'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

const data = [
  { date: '10/12', revenue: 1200 },
  { date: '11/12', revenue: 800 },
  { date: '12/12', revenue: 900 },
  { date: '13/12', revenue: 400 },
  { date: '14/12', revenue: 2300 },
  { date: '15/12', revenue: 800 },
  { date: '16/12', revenue: 640 },
]

export default function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} style={{ fontSize: 12 }} width={750} height={350}>
        <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />
        <YAxis
          stroke="#888"
          axisLine={false}
          tickLine={false}
          width={80}
          tickFormatter={(value: number) =>
            value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })
          }
        />
        <CartesianGrid vertical={false} className="stroke-muted" />

        {/* <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Average
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].value}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Today
                      </span>
                      <span className="font-bold">
                        {payload[1] ? payload[1].value : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            return null
          }}
        /> */}
        <Line
          stroke={colors.violet[500]}
          type="linear"
          strokeWidth={2}
          dataKey="revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
