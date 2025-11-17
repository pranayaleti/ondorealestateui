import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, TrendingDown, Receipt, AlertTriangle, CheckCircle, Download } from "lucide-react"

// Mock financial data
const mockFinancialData = {
  summary: {
    totalRevenue: 78650,
    totalExpenses: 23450,
    netIncome: 55200,
    occupancyRate: 84.4,
    collectionRate: 96.2
  },
  monthlyRevenue: [
    { month: "Jan", revenue: 75200, expenses: 22100 },
    { month: "Feb", revenue: 78650, expenses: 23450 },
    { month: "Mar", revenue: 82100, expenses: 24800 },
    { month: "Apr", revenue: 79300, expenses: 23900 }
  ],
  recentTransactions: [
    { id: 1, type: "income", description: "Rent Payment - John Smith", amount: 1850, date: "2024-01-20", status: "completed" },
    { id: 2, type: "expense", description: "Plumbing Repair - Oak Street", amount: 350, date: "2024-01-19", status: "completed" },
    { id: 3, type: "income", description: "Rent Payment - Sarah Johnson", amount: 1650, date: "2024-01-18", status: "completed" },
    { id: 4, type: "expense", description: "Property Insurance", amount: 1200, date: "2024-01-15", status: "completed" }
  ],
  overduePayments: [
    { id: 1, tenant: "Mike Wilson", property: "Cedar Park", unit: "1A", amount: 1750, daysPastDue: 5 },
    { id: 2, tenant: "Lisa Brown", property: "Oak Street", unit: "3B", amount: 1850, daysPastDue: 12 }
  ]
}

function FinancesDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Financial Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Track revenue, expenses, and financial performance</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">${mockFinancialData.summary.totalRevenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">${mockFinancialData.summary.totalExpenses.toLocaleString()}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Income</p>
                <p className="text-2xl font-bold text-blue-600">${mockFinancialData.summary.netIncome.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                <p className="text-2xl font-bold text-green-600">{mockFinancialData.summary.collectionRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{mockFinancialData.overduePayments.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="overdue">Overdue Payments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Revenue vs Expenses over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFinancialData.monthlyRevenue.map((month) => (
                    <div key={month.month} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{month.month}</span>
                        </div>
                        <div>
                          <p className="font-medium">Revenue: ${month.revenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">Expenses: ${month.expenses.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${(month.revenue - month.expenses).toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Net Income</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest financial activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFinancialData.recentTransactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                          {transaction.type === 'income' ? (
                            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Health Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profit Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {Math.round((mockFinancialData.summary.netIncome / mockFinancialData.summary.totalRevenue) * 100)}%
                </div>
                <p className="text-sm text-gray-500 mt-2">Net income vs total revenue</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average Rent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">$1,847</div>
                <p className="text-sm text-gray-500 mt-2">Per unit per month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Operating Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">
                  {Math.round((mockFinancialData.summary.totalExpenses / mockFinancialData.summary.totalRevenue) * 100)}%
                </div>
                <p className="text-sm text-gray-500 mt-2">Expenses vs revenue</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFinancialData.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                        {transaction.type === 'income' ? (
                          <Receipt className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <DollarSign className="h-5 w-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{transaction.description}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{transaction.date}</span>
                          <span>Type: {transaction.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                      </p>
                      <Badge variant="outline">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                Overdue Payments
              </CardTitle>
              <CardDescription>Payments that require immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFinancialData.overduePayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20 rounded">
                    <div>
                      <h3 className="font-semibold">{payment.tenant}</h3>
                      <p className="text-sm text-gray-600">{payment.property} - Unit {payment.unit}</p>
                      <p className="text-sm text-red-600 font-medium">{payment.daysPastDue} days overdue</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">${payment.amount}</p>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline">Contact</Button>
                        <Button size="sm">Send Notice</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Generate and download financial reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Monthly Reports</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Income Statement - January 2024
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Cash Flow Report - January 2024
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Rent Roll Report - January 2024
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Annual Reports</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Annual Financial Summary - 2023
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Tax Report - 2023
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Property Performance - 2023
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function AdminFinances() {
  return (
    <Routes>
      <Route path="/" element={<FinancesDashboard />} />
      <Route path="/*" element={<FinancesDashboard />} />
    </Routes>
  )
}
