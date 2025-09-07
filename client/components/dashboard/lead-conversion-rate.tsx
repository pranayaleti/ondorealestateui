"use client"

import { ChartContainer, ChartLine } from "@/components/ui/chart"

export function LeadConversionRate() {
  const data = [
    { date: "Jan 1", rate: 18 },
    { date: "Jan 8", rate: 20 },
    { date: "Jan 15", rate: 19 },
    { date: "Jan 22", rate: 22 },
    { date: "Jan 29", rate: 25 },
    { date: "Feb 5", rate: 24 },
    { date: "Feb 12", rate: 26 },
    { date: "Feb 19", rate: 23 },
    { date: "Feb 26", rate: 24 },
    { date: "Mar 5", rate: 27 },
    { date: "Mar 12", rate: 29 },
    { date: "Mar 19", rate: 28 },
    { date: "Mar 26", rate: 30 },
  ]

  return (
    <ChartContainer className="aspect-[2/1]">
      <ChartLine
        data={data}
        x="date"
        y="rate"
        valueFormatter={(value) => `${value}%`}
        showGridLines={true}
        showXAxis={true}
        showYAxis={true}
        className="h-[300px]"
      />
    </ChartContainer>
  )
}
