import { Routes, Route, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { 
  BarChart3, 
  Download, 
  TrendingUp,
  DollarSign,
  Building,
  FileText
} from "lucide-react"
import MonthlySummaryReport from "./monthly-summary-report"
import OccupancyReport from "./occupancy-report"
import TaxReport from "./tax-report"

function ReportsList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb items={[{ label: "Reports", icon: BarChart3 }]} />
      </div>
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-8 h-8 text-gray-600 dark:text-gray-400" />
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate comprehensive investment performance reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Income Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Monthly Average</span>
                <span className="text-gray-900 dark:text-white font-bold">$2,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Highest Month</span>
                <span className="text-green-400 font-bold">$2,400</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Collection Rate</span>
                <span className="text-gray-900 dark:text-white font-bold">98.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Maintenance</span>
                <span className="text-gray-900 dark:text-white font-bold">$250</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Insurance</span>
                <span className="text-gray-900 dark:text-white font-bold">$100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Property Tax</span>
                <span className="text-gray-900 dark:text-white font-bold">$50</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
          <CardHeader>
          <CardTitle className="text-xl font-semibold">Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/owner/reports/monthly-summary">
              <Button className="bg-gray-800 dark:bg-gray-800 hover:bg-gray-700 dark:hover:bg-gray-700 p-6 rounded-lg text-left transition-all w-full h-auto">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-gray-300 flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold text-lg">Monthly Summary</div>
                    <div className="text-gray-400 text-sm">Income & expenses</div>
                  </div>
                </div>
              </Button>
            </Link>

            <Link to="/owner/reports/occupancy">
              <Button className="bg-gray-800 dark:bg-gray-800 hover:bg-gray-700 dark:hover:bg-gray-700 p-6 rounded-lg text-left transition-all w-full h-auto">
                <div className="flex items-center gap-4">
                  <TrendingUp className="w-8 h-8 text-gray-300 flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold text-lg">Occupancy Report</div>
                    <div className="text-gray-400 text-sm">Tenant analytics</div>
                  </div>
                </div>
              </Button>
            </Link>

            <Link to="/owner/reports/tax">
              <Button className="bg-gray-800 dark:bg-gray-800 hover:bg-gray-700 dark:hover:bg-gray-700 p-6 rounded-lg text-left transition-all w-full h-auto">
                <div className="flex items-center gap-4">
                  <DollarSign className="w-8 h-8 text-gray-300 flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold text-lg">Tax Report</div>
                    <div className="text-gray-400 text-sm">Annual summary</div>
                  </div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function OwnerReports() {
  return (
    <Routes>
      <Route path="/" element={<ReportsList />} />
      <Route path="/monthly-summary" element={<MonthlySummaryReport />} />
      <Route path="/occupancy" element={<OccupancyReport />} />
      <Route path="/tax" element={<TaxReport />} />
    </Routes>
  )
}
