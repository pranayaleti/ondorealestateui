import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building, 
  DollarSign, 
  TrendingUp,
  Users,
  Calendar,
  FileText,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Eye,
  Plus,
  MessageSquare,
  Settings,
  Bell
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

// Mock owner data - focused on property ownership perspective
const mockOwnerData = {
  portfolio: {
    totalProperties: 8,
    totalUnits: 45,
    occupiedUnits: 38,
    monthlyRevenue: 78650,
    monthlyExpenses: 23450,
    netIncome: 55200,
    occupancyRate: 84.4
  },
  properties: [
    {
      id: 1,
      name: "Oak Street Apartments",
      address: "123 Oak Street, Salt Lake City, UT",
      units: 12,
      occupied: 10,
      monthlyRevenue: 18500,
      monthlyExpenses: 5200,
      netIncome: 13300,
      managementCompany: "PropertyMatch Management",
      acquisitionDate: "2020-03-15",
      currentValue: 2800000
    },
    {
      id: 2,
      name: "Pine View Complex",
      address: "456 Pine Avenue, Salt Lake City, UT",
      units: 8,
      occupied: 7,
      monthlyRevenue: 14200,
      monthlyExpenses: 4100,
      netIncome: 10100,
      managementCompany: "PropertyMatch Management",
      acquisitionDate: "2019-08-22",
      currentValue: 2200000
    },
    {
      id: 3,
      name: "Maple Heights",
      address: "789 Maple Drive, Salt Lake City, UT",
      units: 15,
      occupied: 13,
      monthlyRevenue: 24750,
      monthlyExpenses: 7800,
      netIncome: 16950,
      managementCompany: "PropertyMatch Management",
      acquisitionDate: "2021-01-10",
      currentValue: 3500000
    }
  ],
  recentActivity: [
    { id: 1, type: "payment", message: "Monthly management report received", time: "2 hours ago", property: "Oak Street Apartments" },
    { id: 2, type: "maintenance", message: "Major repair completed - HVAC system", time: "1 day ago", property: "Pine View Complex", cost: 3500 },
    { id: 3, type: "tenant", message: "New lease signed - Unit 2B", time: "2 days ago", property: "Maple Heights" },
    { id: 4, type: "financial", message: "Quarterly tax documents ready", time: "3 days ago", property: "All Properties" }
  ],
  alerts: [
    { id: 1, type: "financial", message: "Property insurance renewal due - Oak Street", priority: "high", dueDate: "Next week" },
    { id: 2, type: "maintenance", message: "Capital improvement proposal received", priority: "medium", dueDate: "Review needed" },
    { id: 3, type: "legal", message: "Lease renewal negotiations - 3 units", priority: "medium", dueDate: "This month" }
  ]
}

export default function OwnerDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "payment":
      case "financial":
        return <DollarSign className="h-4 w-4 text-green-500" />
      case "maintenance":
        return <Building className="h-4 w-4 text-orange-500" />
      case "tenant":
        return <Users className="h-4 w-4 text-blue-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.firstName} {user?.lastName}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Here's your investment portfolio overview.
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOwnerData.portfolio.totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              {mockOwnerData.portfolio.totalUnits} total units
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockOwnerData.portfolio.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${mockOwnerData.portfolio.netIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((mockOwnerData.portfolio.netIncome / mockOwnerData.portfolio.monthlyRevenue) * 100)}% profit margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOwnerData.portfolio.occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              {mockOwnerData.portfolio.occupiedUnits} of {mockOwnerData.portfolio.totalUnits} units
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <Link to="/owner/property-management/add">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <Plus className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Add Property</p>
                <p className="text-xs text-gray-500">New Investment</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/owner/messages">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <MessageSquare className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Messages</p>
                <p className="text-xs text-gray-500">Chat with Tenants</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/owner/property-management">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <Settings className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Manage</p>
                <p className="text-xs text-gray-500">Property Mgmt</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/owner/finances">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <DollarSign className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Finances</p>
                <p className="text-xs text-gray-500">Income & ROI</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/owner/tenants">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <Users className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Tenants</p>
                <p className="text-xs text-gray-500">Occupancy</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/owner/reports">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <BarChart3 className="h-8 w-8 text-indigo-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Reports</p>
                <p className="text-xs text-gray-500">Analytics</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Portfolio Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Key investment metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">${mockOwnerData.portfolio.monthlyRevenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Monthly Revenue</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">${mockOwnerData.portfolio.monthlyExpenses.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Monthly Expenses</div>
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">${mockOwnerData.portfolio.netIncome.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Net Monthly Income</div>
                </div>
              </CardContent>
            </Card>

            {/* Important Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                  Important Alerts
                </CardTitle>
                <CardDescription>Items requiring your attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockOwnerData.alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm text-gray-500">Due: {alert.dueDate}</p>
                    </div>
                    <Badge className={getPriorityColor(alert.priority)}>
                      {alert.priority}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full border-ondo-orange text-ondo-orange hover:bg-ondo-orange hover:text-white">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Investment Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Annual ROI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">12.8%</div>
                <p className="text-sm text-gray-500 mt-2">Return on investment</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">$8.5M</div>
                <p className="text-sm text-gray-500 mt-2">Total estimated value</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cash Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">${(mockOwnerData.portfolio.netIncome * 12).toLocaleString()}</div>
                <p className="text-sm text-gray-500 mt-2">Annual net income</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Property Portfolio</CardTitle>
                <CardDescription>Your real estate investments</CardDescription>
              </div>
              <Link to="/owner/properties">
                <Button className="bg-ondo-orange hover:bg-ondo-red transition-colors">View All Properties</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOwnerData.properties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Building className="h-8 w-8 text-blue-500" />
                      <div>
                        <h3 className="font-semibold">{property.name}</h3>
                        <p className="text-sm text-gray-500">{property.address}</p>
                        <p className="text-xs text-gray-400">
                          Acquired: {property.acquisitionDate} • Managed by: {property.managementCompany}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">${property.netIncome.toLocaleString()}/month</p>
                      <p className="text-sm text-gray-500">{property.occupied}/{property.units} units occupied</p>
                      <p className="text-xs text-gray-400">Value: ${(property.currentValue / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                All Alerts & Notifications
              </CardTitle>
              <CardDescription>Important items requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOwnerData.alerts.map((alert) => (
                  <Card key={alert.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{alert.message}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Type: {alert.type} • Due: {alert.dueDate}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(alert.priority)}>
                            {alert.priority} priority
                          </Badge>
                          <Button size="sm" className="bg-ondo-orange hover:bg-ondo-red transition-colors">Take Action</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Portfolio Activity</CardTitle>
              <CardDescription>Latest updates across your properties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOwnerData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex items-start space-x-3">
                      {getActivityIcon(activity.type)}
                      <div>
                        <p className="font-medium">{activity.message}</p>
                        <p className="text-sm text-gray-500">{activity.property}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {activity.cost && (
                        <p className="font-semibold text-red-600">-${activity.cost}</p>
                      )}
                      <Badge variant="outline">
                        {activity.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
