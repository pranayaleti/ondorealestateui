import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Download,
  Receipt,
  BarChart3
} from "lucide-react"

const mockFinancialData = {
  summary: {
    totalRevenue: 78650,
    totalExpenses: 23450,
    netIncome: 55200,
    annualROI: 12.8,
    portfolioValue: 8500000
  },
  monthlyBreakdown: [
    { month: "Jan", revenue: 75200, expenses: 22100, netIncome: 53100 },
    { month: "Feb", revenue: 78650, expenses: 23450, netIncome: 55200 },
    { month: "Mar", revenue: 82100, expenses: 24800, netIncome: 57300 }
  ]
}

export default function OwnerFinances() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Financial Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your investment performance and cash flow</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Financial Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
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
                <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
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
                <p className="text-sm font-medium text-gray-600">Annual ROI</p>
                <p className="text-2xl font-bold text-purple-600">{mockFinancialData.summary.annualROI}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Portfolio Value</p>
                <p className="text-2xl font-bold text-orange-600">${(mockFinancialData.summary.portfolioValue / 1000000).toFixed(1)}M</p>
              </div>
              <Receipt className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="income">Income Analysis</TabsTrigger>
          <TabsTrigger value="expenses">Expense Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>Revenue, expenses, and net income trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFinancialData.monthlyBreakdown.map((month) => (
                  <div key={month.month} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{month.month}</span>
                      </div>
                      <div>
                        <p className="font-medium">Revenue: ${month.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Expenses: ${month.expenses.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">${month.netIncome.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Net Income</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Income Sources</CardTitle>
              <CardDescription>Breakdown of rental income by property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded">
                  <span>Oak Street Apartments</span>
                  <span className="font-semibold">$18,500/month</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded">
                  <span>Pine View Complex</span>
                  <span className="font-semibold">$14,200/month</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded">
                  <span>Maple Heights</span>
                  <span className="font-semibold">$24,750/month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
              <CardDescription>Monthly operating expenses breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded">
                  <span>Property Management Fees</span>
                  <span className="font-semibold text-red-600">$7,865</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded">
                  <span>Maintenance & Repairs</span>
                  <span className="font-semibold text-red-600">$5,200</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded">
                  <span>Insurance</span>
                  <span className="font-semibold text-red-600">$3,450</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded">
                  <span>Property Taxes</span>
                  <span className="font-semibold text-red-600">$4,200</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded">
                  <span>Utilities & Other</span>
                  <span className="font-semibold text-red-600">$2,735</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
