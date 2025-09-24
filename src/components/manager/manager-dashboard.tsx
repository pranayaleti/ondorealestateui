import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building, 
  AlertTriangle,
  Clock,
  BarChart3
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { propertyApi, type Property } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function ManagerDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [properties, setProperties] = useState<Property[]>([])
  const [pendingProperties, setPendingProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Fetch all properties and filter for pending ones
      const allProps = await propertyApi.getProperties()
      const pendingProps = allProps.filter(p => p.status === "pending")
      
      setProperties(allProps)
      setPendingProperties(pendingProps)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Calculate stats from real data
  const stats = {
    totalProperties: properties.length,
    pendingReview: pendingProperties.length,
    approvedProperties: properties.filter(p => p.status === "approved").length,
    rejectedProperties: properties.filter(p => p.status === "rejected").length,
  }


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manager Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.email}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProperties}</div>
                <p className="text-xs text-muted-foreground">
                  All registered properties
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingReview}</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting approval
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                <Building className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.approvedProperties}</div>
                <p className="text-xs text-muted-foreground">
                  Active properties
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.rejectedProperties}</div>
                <p className="text-xs text-muted-foreground">
                  Rejected submissions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/dashboard/properties">
                  <Button className="w-full justify-start">
                    <Building className="h-4 w-4 mr-2" />
                    Review Properties
                  </Button>
                </Link>
                <Button className="w-full justify-start" variant="outline" onClick={fetchDashboardData}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Submissions</CardTitle>
                <CardDescription>Latest property submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingProperties.slice(0, 3).map((property) => (
                    <div key={property.id} className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{property.title}</p>
                        <p className="text-xs text-gray-500">{property.city}</p>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                  ))}
                  {pendingProperties.length === 0 && (
                    <p className="text-sm text-gray-500">No pending submissions</p>
                  )}
                </div>
                <Link to="/dashboard/properties">
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Review All Properties
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Property Overview</h2>
            <Link to="/dashboard/properties">
              <Button>
                <Building className="h-4 w-4 mr-2" />
                Manage Properties
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.slice(0, 6).map((property) => (
              <Card key={property.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{property.title}</CardTitle>
                      <CardDescription>{property.city}, {property.country}</CardDescription>
                    </div>
                    <Badge variant={
                      property.status === "approved" ? "default" : 
                      property.status === "rejected" ? "destructive" : 
                      "secondary"
                    }>
                      {property.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Type:</span>
                      <span className="capitalize">{property.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Submitted:</span>
                      <span>{new Date(property.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {properties.length === 0 && (
            <div className="text-center py-12">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600">Properties will appear here once submitted by owners.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
