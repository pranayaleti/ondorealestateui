import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Home, 
  Wrench, 
  CreditCard, 
  FileText, 
  MessageSquare, 
  User,
  Settings,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

// Mock data for tenant dashboard
const mockTenantData = {
  property: {
    address: "123 Oak Street, Apt 2B",
    city: "Salt Lake City, UT 84101",
    rent: 1850,
    leaseEnd: "2024-12-31",
    bedrooms: 2,
    bathrooms: 1
  },
  recentPayments: [
    { id: 1, date: "2024-01-01", amount: 1850, status: "paid", type: "Rent" },
    { id: 2, date: "2023-12-01", amount: 1850, status: "paid", type: "Rent" },
    { id: 3, date: "2023-11-01", amount: 1850, status: "paid", type: "Rent" }
  ],
  maintenanceRequests: [
    { id: 1, title: "Leaky Faucet", status: "in_progress", date: "2024-01-15", priority: "medium" },
    { id: 2, title: "Heating Issue", status: "completed", date: "2024-01-10", priority: "high" },
    { id: 3, title: "Light Bulb Replacement", status: "pending", date: "2024-01-12", priority: "low" }
  ],
  messages: [
    { id: 1, from: "Property Manager", subject: "Lease Renewal Notice", date: "2024-01-20", unread: true },
    { id: 2, from: "Maintenance Team", subject: "Scheduled Inspection", date: "2024-01-18", unread: false }
  ]
}

export default function TenantDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-red-500" />
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
          Here's what's happening with your rental
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Link to="/tenant/maintenance">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <Wrench className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Maintenance</p>
                <p className="text-xs text-gray-500">Submit Request</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/tenant/payments">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <CreditCard className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Payments</p>
                <p className="text-xs text-gray-500">View History</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/tenant/documents">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <FileText className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Documents</p>
                <p className="text-xs text-gray-500">Lease & More</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/tenant/messages">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <MessageSquare className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Messages</p>
                <p className="text-xs text-gray-500">
                  {mockTenantData.messages.filter(m => m.unread).length} New
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/tenant/settings">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <Settings className="h-8 w-8 text-gray-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Settings</p>
                <p className="text-xs text-gray-500">Preferences</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="property">Property</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Rent Status */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Rent Due</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${mockTenantData.property.rent}</div>
                <p className="text-xs text-muted-foreground">Due February 1st</p>
                <Button className="w-full mt-3 bg-ondo-orange hover:bg-ondo-red transition-colors" size="sm">
                  Pay Now
                </Button>
              </CardContent>
            </Card>

            {/* Lease Status */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lease Expires</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Dec 31</div>
                <p className="text-xs text-muted-foreground">2024</p>
                <Badge variant="outline" className="mt-3">
                  11 months left
                </Badge>
              </CardContent>
            </Card>

            {/* Active Requests */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockTenantData.maintenanceRequests.filter(r => r.status !== "completed").length}
                </div>
                <p className="text-xs text-muted-foreground">Maintenance requests</p>
                <Link to="/tenant/maintenance">
                  <Button variant="outline" className="w-full mt-3 border-ondo-orange text-ondo-orange hover:bg-ondo-orange hover:text-white" size="sm">
                    View All
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Maintenance</CardTitle>
                <CardDescription>Your latest maintenance requests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockTenantData.maintenanceRequests.slice(0, 3).map((request) => (
                  <div key={request.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(request.status)}
                      <div>
                        <p className="text-sm font-medium">{request.title}</p>
                        <p className="text-xs text-gray-500">{request.date}</p>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                  </div>
                ))}
                <Link to="/tenant/maintenance">
                  <Button variant="outline" className="w-full border-ondo-orange text-ondo-orange hover:bg-ondo-orange hover:text-white">
                    View All Requests
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Latest communications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockTenantData.messages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${message.unread ? 'bg-blue-500' : 'bg-gray-300'}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{message.subject}</p>
                      <p className="text-xs text-gray-500">From: {message.from}</p>
                      <p className="text-xs text-gray-500">{message.date}</p>
                    </div>
                  </div>
                ))}
                <Link to="/tenant/messages">
                  <Button variant="outline" className="w-full border-ondo-orange text-ondo-orange hover:bg-ondo-orange hover:text-white">
                    View All Messages
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="property" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Property</CardTitle>
              <CardDescription>Property details and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-lg">{mockTenantData.property.address}</p>
                  <p className="text-sm text-gray-500">{mockTenantData.property.city}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Monthly Rent</label>
                  <p className="text-lg font-semibold">${mockTenantData.property.rent}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Bedrooms</label>
                  <p className="text-lg">{mockTenantData.property.bedrooms}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Bathrooms</label>
                  <p className="text-lg">{mockTenantData.property.bathrooms}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Lease End Date</label>
                  <p className="text-lg">{mockTenantData.property.leaseEnd}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Maintenance Requests</CardTitle>
                <CardDescription>Track your maintenance requests</CardDescription>
              </div>
              <Link to="/tenant/maintenance/new">
                <Button>New Request</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTenantData.maintenanceRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(request.status)}
                      <div>
                        <p className="font-medium">{request.title}</p>
                        <p className="text-sm text-gray-500">Submitted: {request.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                      <Badge variant="outline">
                        {request.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your recent rent payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTenantData.recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{payment.type}</p>
                      <p className="text-sm text-gray-500">{payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${payment.amount}</p>
                      <Badge variant="outline" className="text-green-600">
                        {payment.status}
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
