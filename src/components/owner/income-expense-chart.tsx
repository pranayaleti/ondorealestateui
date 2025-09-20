"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for the chart
const data = [
  {
    name: "Jan",
    income: 5200,
    expenses: 2100,
  },
  {
    name: "Feb",
    income: 5300,
    expenses: 2200,
  },
  {
    name: "Mar",
    income: 5400,
    expenses: 2300,
  },
  {
    name: "Apr",
    income: 5500,
    expenses: 2400,
  },
  {
    name: "May",
    income: 8750,
    expenses: 3450,
  },
  {
    name: "Jun",
    income: 8800,
    expenses: 3500,
  },
]

export function IncomeExpenseChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`$${value}`, undefined]} labelFormatter={(label) => `Month: ${label}`} />
        <Legend />
        <Bar dataKey="income" name="Income" fill="#22c55e" />
        <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  )
}
