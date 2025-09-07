"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for property type distribution
const data = [
  { name: "Single-Family", value: 45, color: "#4f46e5" },
  { name: "Multi-Family", value: 25, color: "#06b6d4" },
  { name: "Apartment", value: 20, color: "#8b5cf6" },
  { name: "Condo", value: 10, color: "#ec4899" },
]

export function PropertyTypeDistribution() {
  return (
    <ChartContainer
      className="h-[300px] w-full"
      title="Property Types"
      description="Distribution of managed property types"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      content={[
                        {
                          label: payload[0].name,
                          value: `${payload[0].value}%`,
                        },
                      ]}
                    />
                  </ChartTooltip>
                )
              }
              return null
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
