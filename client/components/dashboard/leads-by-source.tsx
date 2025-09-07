"use client"

import { ChartContainer, ChartLegend, ChartPie } from "@/components/ui/chart"

export function LeadsBySource() {
  const data = [
    { name: "Website", value: 45, color: "#3b82f6" },
    { name: "Referral", value: 25, color: "#10b981" },
    { name: "Social Media", value: 15, color: "#f59e0b" },
    { name: "Email", value: 10, color: "#8b5cf6" },
    { name: "Other", value: 5, color: "#6b7280" },
  ]

  return (
    <ChartContainer className="aspect-square">
      <ChartPie
        data={data}
        index="name"
        category="value"
        valueFormatter={(value) => `${value}%`}
        className="h-full w-full"
      />
      <ChartLegend className="mt-4 justify-center gap-4" data={data} index="name" color="color" />
    </ChartContainer>
  )
}
