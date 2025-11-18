import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Building, Wrench, DollarSign, AlertTriangle, BarChart3, Settings } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { AdminNav } from "./admin-nav"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const navItems = [
    { label: "Overview", value: "overview", onClick: () => setActiveTab("overview") },
    { label: "Managers", value: "managers", onClick: () => setActiveTab("managers") },
    { label: "System Stats", value: "stats", onClick: () => setActiveTab("stats") },
    { label: "Activity", value: "activity", onClick: () => setActiveTab("activity") },
  ]

  // Mock data - replace with API calls
  const mockData = {
    stats: {
      totalManagers: 12,
      totalOwners: 145,
      totalTenants: 523,
      totalMaintenance: 28,
      totalProperties: 892,
      systemHealth: 98.5,
    },
    recentActivity: [
      { id: 1, type: "manager", message: "New manager account created", time: "1 hour ago", status: "success" },
      { id: 2, type: "owner", message: "Owner account activated", time: "3 hours ago", status: "success" },
      { id: 3, type: "system", message: "System backup completed", time: "6 hours ago", status: "success" },
      { id: 4, type: "alert", message: "High API usage detected", time: "1 day ago", status: "warning" },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Shield className="h-8 w-8 text-blue-600" />
                Admin Portal
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                System-wide management and oversight
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                {user?.firstName} {user?.lastName}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4">
          <AdminNav items={navItems} activeTab={activeTab} />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Managers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockData.stats.totalManagers}</div>
                  <p className="text-xs text-muted-foreground">Active manager accounts</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Owners</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockData.stats.totalOwners}</div>
                  <p className="text-xs text-muted-foreground">Registered owners</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tenants</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockData.stats.totalTenants}</div>
                  <p className="text-xs text-muted-foreground">Active tenants</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Health</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockData.stats.systemHealth}%</div>
                  <p className="text-xs text-muted-foreground">Uptime & performance</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/admin/managers">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="flex items-center p-4">
                    <Users className="h-8 w-8 text-blue-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Manage Managers</p>
                      <p className="text-xs text-gray-500">View & edit</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/admin/owners">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="flex items-center p-4">
                    <Building className="h-8 w-8 text-green-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Manage Owners</p>
                      <p className="text-xs text-gray-500">View & edit</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/admin/maintenance">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="flex items-center p-4">
                    <Wrench className="h-8 w-8 text-orange-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Maintenance Staff</p>
                      <p className="text-xs text-gray-500">Manage accounts</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/admin/settings">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="flex items-center p-4">
                    <Settings className="h-8 w-8 text-purple-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium">System Settings</p>
                      <p className="text-xs text-gray-500">Configure</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent System Activity</CardTitle>
                <CardDescription>Latest administrative actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <Badge variant={activity.status === "success" ? "default" : "outline"}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "managers" && (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Manager Management</CardTitle>
                <CardDescription>View and manage all manager accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/admin/managers">
                  <Button>View All Managers</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "stats" && (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>System Statistics</CardTitle>
                <CardDescription>Comprehensive system metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-500">Total Properties</p>
                    <p className="text-2xl font-bold">{mockData.stats.totalProperties}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-500">Maintenance Staff</p>
                    <p className="text-2xl font-bold">{mockData.stats.totalMaintenance}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-500">System Health</p>
                    <p className="text-2xl font-bold">{mockData.stats.systemHealth}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "activity" && (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Complete system activity history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{activity.message}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <Badge variant={activity.status === "success" ? "default" : "outline"}>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
