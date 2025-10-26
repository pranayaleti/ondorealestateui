import { useState, useEffect } from "react"
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
  FileText,
  BarChart3,
  AlertTriangle,
  Plus,
  MessageSquare,
  Settings
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { propertyApi, type Property } from "@/lib/api"
import { PropertyImageCarousel } from "@/components/ui/property-image-carousel"
import { ModernPropertyCard } from "./modern-property-card"
import { PropertyDetailModal } from "@/components/property-detail-modal"

// Extended property interface for dashboard
interface DashboardProperty extends Property {
  units?: number;
  occupied?: number;
  monthlyRevenue?: number;
  monthlyExpenses?: number;
  netIncome?: number;
  managementCompany?: string;
  currentValue?: number;
}

// Mock data for features not yet implemented
const mockStaticData = {
  recentActivity: [
    { id: 1, type: "payment", message: "Monthly management report received", time: "2 hours ago", property: "Property Management" },
    { id: 2, type: "maintenance", message: "Maintenance request submitted", time: "1 day ago", property: "Property Management", cost: 350 },
    { id: 3, type: "tenant", message: "New tenant inquiry received", time: "2 days ago", property: "Property Management" },
    { id: 4, type: "financial", message: "Monthly reports available", time: "3 days ago", property: "All Properties" }
  ],
  alerts: [
    { id: 1, type: "financial", message: "Property insurance renewal due", priority: "high", dueDate: "Next week" },
    { id: 2, type: "maintenance", message: "Property maintenance scheduled", priority: "medium", dueDate: "Review needed" },
    { id: 3, type: "legal", message: "Document review required", priority: "medium", dueDate: "This month" }
  ]
}

export default function OwnerDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [properties, setProperties] = useState<DashboardProperty[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showPropertyDetail, setShowPropertyDetail] = useState(false)
  const [portfolioStats, setPortfolioStats] = useState({
    totalProperties: 0,
    totalUnits: 0,
    occupiedUnits: 0,
    monthlyRevenue: 0,
    monthlyExpenses: 0,
    netIncome: 0,
    occupancyRate: 0
  })

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      const data = await propertyApi.getProperties()
      
      // Filter for owner's properties (all statuses - pending, approved, rejected)
      const ownerProperties = data.filter(property => 
        property.ownerId === user.id
      )
      
      // Transform properties for dashboard display
      const dashboardProperties: DashboardProperty[] = ownerProperties.map(property => {
        // Each property counts as 1 unit
        const units = 1
        // Occupied if it has a tenant
        const occupied = property.tenantId ? 1 : 0
        // Monthly revenue is the property's price if occupied
        const monthlyRevenue = property.tenantId ? (property.price || 0) : 0
        // Estimate expenses as 20% of revenue (management fees, maintenance, etc.)
        const monthlyExpenses = monthlyRevenue * 0.2
        
        return {
          ...property,
          units,
          occupied,
          monthlyRevenue,
          monthlyExpenses,
          netIncome: monthlyRevenue - monthlyExpenses,
        }
      })
      
      // Calculate portfolio statistics from real data
      const stats = dashboardProperties.reduce((acc, property) => {
        acc.totalProperties += 1
        acc.totalUnits += property.units || 0
        acc.occupiedUnits += property.occupied || 0
        acc.monthlyRevenue += property.monthlyRevenue || 0
        acc.monthlyExpenses += property.monthlyExpenses || 0
        acc.netIncome += property.netIncome || 0
        return acc
      }, {
        totalProperties: 0,
        totalUnits: 0,
        occupiedUnits: 0,
        monthlyRevenue: 0,
        monthlyExpenses: 0,
        netIncome: 0,
        occupancyRate: 0
      })
      
      // Calculate occupancy rate based on actual occupancy
      stats.occupancyRate = stats.totalProperties > 0 ? (stats.occupiedUnits / stats.totalProperties) * 100 : 0
      
      setProperties(dashboardProperties)
      setPortfolioStats(stats)
    } catch (error) {
      console.error("Error fetching properties:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewProperty = (property: Property) => {
    setSelectedProperty(property)
    setShowPropertyDetail(true)
  }

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    )
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
            <div className="text-2xl font-bold">{portfolioStats.totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              Properties in portfolio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioStats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From occupied properties
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${portfolioStats.netIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {portfolioStats.monthlyRevenue > 0 ? Math.round((portfolioStats.netIncome / portfolioStats.monthlyRevenue) * 100) : 0}% profit margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioStats.occupancyRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {portfolioStats.occupiedUnits} of {portfolioStats.totalProperties} properties
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
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
                    <div className="text-2xl font-bold text-green-600">${portfolioStats.monthlyRevenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Monthly Revenue</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">${portfolioStats.monthlyExpenses.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Monthly Expenses</div>
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">${portfolioStats.netIncome.toLocaleString()}</div>
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
                {mockStaticData.alerts.map((alert) => (
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
                {(() => {
                  // Calculate Annual ROI: (Annual Net Income / Portfolio Value) * 100
                  // Portfolio Value = Total property values (estimated at price * 12 * 10 years)
                  // Annual Net Income = Net Income * 12
                  const annualNetIncome = portfolioStats.netIncome * 12
                  const estimatedPortfolioValue = properties.reduce((sum, prop) => {
                    return sum + (prop.price ? prop.price * 12 * 10 : 0) // 10 years of rent (monthly * 12 * 10)
                  }, 0)
                  const annualROI = estimatedPortfolioValue > 0 
                    ? ((annualNetIncome / estimatedPortfolioValue) * 100).toFixed(1) 
                    : 0
                  
                  return (
                    <>
                      <div className="text-3xl font-bold text-green-600">{annualROI}%</div>
                      <p className="text-sm text-gray-500 mt-2">Return on investment</p>
                    </>
                  )
                })()}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  // Calculate total portfolio value as sum of property values
                  // Estimate property value as 10 years of annual rent
                  const totalValue = properties.reduce((sum, prop) => {
                    return sum + (prop.price ? prop.price * 12 * 10 : 0) // Monthly rent * 12 months * 10 years
                  }, 0)
                  
                  const formattedValue = totalValue >= 1000000
                    ? `$${(totalValue / 1000000).toFixed(1)}M`
                    : totalValue >= 1000
                    ? `$${(totalValue / 1000).toFixed(0)}K`
                    : `$${totalValue.toLocaleString()}`
                  
                  return (
                    <>
                      <div className="text-3xl font-bold text-blue-600">{formattedValue}</div>
                      <p className="text-sm text-gray-500 mt-2">Total estimated value</p>
                    </>
                  )
                })()}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cash Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">${(portfolioStats.netIncome * 12).toLocaleString()}</div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.length > 0 ? (
                  properties.map((property) => (
                    <ModernPropertyCard
                      key={property.id}
                      property={property}
                      onViewDetails={handleViewProperty}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                    <p className="text-gray-600 mb-4">Get started by adding your first property.</p>
                    <Link to="/owner/properties/add">
                      <Button className="bg-ondo-orange hover:bg-ondo-red transition-colors">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Property
                      </Button>
                    </Link>
                  </div>
                )}
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
                {mockStaticData.alerts.map((alert) => (
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
                {mockStaticData.recentActivity.map((activity) => (
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

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        open={showPropertyDetail}
        onOpenChange={setShowPropertyDetail}
        showActions={false}
      />
    </div>
  )
}
