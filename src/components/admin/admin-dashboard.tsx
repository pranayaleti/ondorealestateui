import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Users, Wrench, DollarSign, AlertTriangle, Clock, FileText, BarChart3, Plus } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

// Mock admin dashboard data
const mockAdminData = {
  stats: {
    totalProperties: 45,
    totalTenants: 38,
    occupancyRate: 84.4,
    monthlyRevenue: 78650,
    pendingMaintenance: 12,
    overduePayments: 3
  },
  recentActivity: [
    { id: 1, type: "payment", message: "Rent payment received from John Smith", time: "2 hours ago", status: "success" },
    { id: 2, type: "maintenance", message: "New maintenance request - Apt 2B heating issue", time: "4 hours ago", status: "pending" },
    { id: 3, type: "lease", message: "Lease renewal signed - Sarah Johnson", time: "1 day ago", status: "success" },
    { id: 4, type: "application", message: "New rental application submitted", time: "1 day ago", status: "pending" }
  ],
  urgentItems: [
    { id: 1, type: "maintenance", title: "Emergency plumbing repair - Apt 5A", priority: "high", dueDate: "Today" },
    { id: 2, type: "payment", title: "Overdue rent payment - Unit 12", priority: "high", dueDate: "3 days overdue" },
    { id: 3, type: "inspection", title: "Property inspection - 123 Oak St", priority: "medium", dueDate: "Tomorrow" }
  ],
  properties: [
    { id: 1, name: "Oak Street Apartments", units: 12, occupied: 10, revenue: 18500, status: "active" },
    { id: 2, name: "Pine View Complex", units: 8, occupied: 7, revenue: 14200, status: "active" },
    { id: 3, name: "Maple Heights", units: 15, occupied: 13, revenue: 24750, status: "active" },
    { id: 4, name: "Cedar Park Homes", units: 10, occupied: 8, revenue: 21200, status: "maintenance" }
  ]
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <DollarSign className="h-4 w-4 text-green-500" />
      case "maintenance":
        return <Wrench className="h-4 w-4 text-orange-500" />
      case "lease":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "application":
        return <Users className="h-4 w-4 text-purple-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
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
          Here's your property management overview.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdminData.stats.totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              {mockAdminData.stats.occupancyRate}% occupied
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdminData.stats.totalTenants}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockAdminData.stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdminData.stats.pendingMaintenance}</div>
            <p className="text-xs text-muted-foreground">
              Maintenance requests
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link to="/dashboard/owners/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <Plus className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Add Owner</p>
                <p className="text-xs text-gray-500">New client</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/tenants/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <Users className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Add Tenant</p>
                <p className="text-xs text-gray-500">New lease</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/maintenance">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <Wrench className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Maintenance</p>
                <p className="text-xs text-gray-500">{mockAdminData.stats.pendingMaintenance} pending</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/reports">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <BarChart3 className="h-8 w-8 text-purple-500 mr-3" />
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
          <TabsTrigger value="urgent">Urgent Items</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Urgent Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                  Urgent Items
                </CardTitle>
                <CardDescription>Items requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAdminData.urgentItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">Due: {item.dueDate}</p>
                    </div>
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                ))}
                <Link to="/dashboard/maintenance">
                  <Button variant="outline" className="w-full border-ondo-orange text-ondo-orange hover:bg-ondo-orange hover:text-white">
                    View All Issues
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAdminData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <Badge variant={activity.status === "success" ? "default" : "outline"}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full border-ondo-orange text-ondo-orange hover:bg-ondo-orange hover:text-white">
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Occupancy Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {mockAdminData.stats.occupancyRate}%
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {mockAdminData.stats.totalTenants} of {Math.round(mockAdminData.stats.totalTenants / (mockAdminData.stats.occupancyRate / 100))} units occupied
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Collection Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">96.2%</div>
                <p className="text-sm text-gray-500 mt-2">
                  {mockAdminData.stats.overduePayments} overdue payments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Maintenance Response</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">2.1 days</div>
                <p className="text-sm text-gray-500 mt-2">
                  Average response time
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Property Portfolio</CardTitle>
                <CardDescription>Overview of all managed properties</CardDescription>
              </div>
              <Link to="/dashboard/properties">
                <Button className="bg-ondo-orange hover:bg-ondo-red transition-colors">View All Properties</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAdminData.properties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Building className="h-8 w-8 text-blue-500" />
                      <div>
                        <h3 className="font-semibold">{property.name}</h3>
                        <p className="text-sm text-gray-500">
                          {property.occupied}/{property.units} units occupied
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${property.revenue.toLocaleString()}/month</p>
                      <Badge variant={property.status === "active" ? "default" : "outline"}>
                        {property.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="urgent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                Urgent Items Requiring Attention
              </CardTitle>
              <CardDescription>Critical issues that need immediate action</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAdminData.urgentItems.map((item) => (
                  <Card key={item.id} className="border-l-4 border-l-red-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Type: {item.type} • Due: {item.dueDate}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(item.priority)}>
                            {item.priority} priority
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
              <CardTitle>System Activity Log</CardTitle>
              <CardDescription>Detailed log of all system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAdminData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex items-start space-x-3">
                      {getActivityIcon(activity.type)}
                      <div>
                        <p className="font-medium">{activity.message}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <Badge variant={activity.status === "success" ? "default" : "outline"}>
                      {activity.status}
                    </Badge>
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
