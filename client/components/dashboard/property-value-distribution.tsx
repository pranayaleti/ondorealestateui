"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for property value distribution
const data = [
  { month: "Jan", revenue: 18500 },
  { month: "Feb", revenue: 19200 },
  { month: "Mar", revenue: 21000 },
  { month: "Apr", revenue: 22400 },
  { month: "May", revenue: 24100 },
  { month: "Jun", revenue: 26500 },
  { month: "Jul", revenue: 27800 },
  { month: "Aug", revenue: 29200 },
  { month: "Sep", revenue: 31000 },
  { month: "Oct", revenue: 33500 },
  { month: "Nov", revenue: 34800 },
  { month: "Dec", revenue: 36200 },
]

export function PropertyValueDistribution() {
  return (
    <ChartContainer
      className="h-[300px] w-full"
      title="Monthly Rental Revenue"
      description="Rental income collected per month"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickMargin={10} />
          <YAxis
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      content={[
                        {
                          label: "Revenue",
                          value: `$${payload[0].value.toLocaleString()}`,
                        },
                      ]}
                    />
                  </ChartTooltip>
                )
              }
              return null
            }}
          />
          <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
