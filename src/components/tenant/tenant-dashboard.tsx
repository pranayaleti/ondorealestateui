import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
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
  Clock,
  MapPin,
  Building
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { propertyApi, maintenanceApi, type Property, type MaintenanceRequest } from "@/lib/api"

export default function TenantDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")
  const [assignedProperty, setAssignedProperty] = useState<Property | null>(null)
  const [loadingProperty, setLoadingProperty] = useState(true)
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([])
  const [loadingMaintenance, setLoadingMaintenance] = useState(true)

  useEffect(() => {
    fetchAssignedProperty()
    fetchMaintenanceRequests()
  }, [])

  const fetchAssignedProperty = async () => {
    try {
      setLoadingProperty(true)
      const property = await propertyApi.getTenantProperty()
      setAssignedProperty(property)
    } catch (error) {
      console.error("Error fetching assigned property:", error)
      // Property might not be assigned yet
      setAssignedProperty(null)
    } finally {
      setLoadingProperty(false)
    }
  }

  const fetchMaintenanceRequests = async () => {
    try {
      setLoadingMaintenance(true)
      const requests = await maintenanceApi.getTenantMaintenanceRequests()
      setMaintenanceRequests(requests)
    } catch (error) {
      console.error("Error fetching maintenance requests:", error)
      setMaintenanceRequests([])
    } finally {
      setLoadingMaintenance(false)
    }
  }

  // Filter active requests (in_progress and pending with assignedTo)
  const getActiveRequests = () => {
    return maintenanceRequests.filter(request => 
      (request.status === 'in_progress' || request.status === 'pending') && 
      request.assignedTo
    )
  }

  // Filter recent maintenance (unassigned and completed)
  const getRecentMaintenance = () => {
    return maintenanceRequests.filter(request => 
      !request.assignedTo || request.status === 'completed'
    )
  }

  // Calculate next rent due date (one month from move-in date, recurring monthly)
  const getNextRentDueDate = () => {
    if (!assignedProperty) return null
    
    const moveInDate = new Date(assignedProperty.createdAt)
    const now = new Date()
    
    // Start from move-in date
    let nextDueDate = new Date(moveInDate)
    
    // Keep adding months until we get a date in the future
    while (nextDueDate <= now) {
      nextDueDate.setMonth(nextDueDate.getMonth() + 1)
    }
    
    return nextDueDate
  }

  // Format date for display
  const formatRentDueDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric' 
    })
  }

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link to="/tenant/maintenance/">
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

        {/* <Link to="/tenant/payments"> */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <CreditCard className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Payments</p>
                {/* <p className="text-xs text-gray-500">View History</p> */}
                <p className="text-xs text-gray-500">Coming Soon...</p>
              </div>
            </CardContent>
          </Card>
        {/* </Link> */}

        {/* <Link to="/tenant/documents"> */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <FileText className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Documents</p>
                {/* <p className="text-xs text-gray-500">Lease & More</p> */}
                <p className="text-xs text-gray-500">Coming Soon...</p>
              </div>
            </CardContent>
          </Card>
        {/* </Link> */}

        {/* <Link to="/tenant/messages"> */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <MessageSquare className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Messages</p>
                {/* <p className="text-xs text-gray-500">
                  0 New
                </p> */}
                <p className="text-xs text-gray-500">Coming Soon...</p>
              </div>
            </CardContent>
          </Card>
        {/* </Link> */}

        {/* <Link to="/tenant/settings">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <Settings className="h-8 w-8 text-gray-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Settings</p>
                <p className="text-xs text-gray-500">Preferences</p>
              </div>
            </CardContent>
          </Card>
        </Link> */}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="property">Property</TabsTrigger>
          <TabsTrigger value="maintenance" onClick={() => navigate('/tenant/maintenance/')}>Maintenance</TabsTrigger>
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
                <div className="text-2xl font-bold">
                  ${assignedProperty?.price?.toLocaleString() || '0'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Due {getNextRentDueDate() ? formatRentDueDate(getNextRentDueDate()!) : 'N/A'}
                </p>
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
                <div className="text-2xl font-bold">Dec x</div>
                <p className="text-xs text-muted-foreground">Year</p>
                <Badge variant="outline" className="mt-3">
                  x months left
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
                  {loadingMaintenance ? "..." : getActiveRequests().length}
                </div>
                <p className="text-xs text-muted-foreground">Assigned maintenance requests</p>
                {getActiveRequests().length > 0 && (
                  <div className="mt-3 space-y-2">
                    {getActiveRequests().slice(0, 2).map((request) => (
                      <div key={request.id} className="flex items-center justify-between text-xs">
                        <span className="truncate">{request.title}</span>
                        <Badge variant={request.status === 'in_progress' ? 'default' : 'secondary'}>
                          {request.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    ))}
                    {getActiveRequests().length > 2 && (
                      <p className="text-xs text-muted-foreground">+{getActiveRequests().length - 2} more</p>
                    )}
                  </div>
                )}
                <Link to="/tenant/maintenance/">
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
                {loadingMaintenance ? (
                  <div className="text-center py-4">
                    <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2 animate-spin" />
                    <p className="text-sm text-gray-500">Loading...</p>
                  </div>
                ) : getRecentMaintenance().length === 0 ? (
                  <div className="text-center py-4">
                    <Wrench className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No maintenance requests yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {getRecentMaintenance().slice(0, 3).map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{request.title}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={
                              request.status === 'completed' ? 'default' : 
                              request.status === 'in_progress' ? 'secondary' : 
                              'outline'
                            }
                          >
                            {request.status.replace('_', ' ')}
                          </Badge>
                          {request.assignedTo && (
                            <span className="text-xs text-gray-500">Assigned</span>
                          )}
                        </div>
                      </div>
                    ))}
                    {getRecentMaintenance().length > 3 && (
                      <p className="text-xs text-gray-500 text-center">
                        +{getRecentMaintenance().length - 3} more requests
                      </p>
                    )}
                  </div>
                )}
                <Link to="/tenant/maintenance/">
                  <Button variant="outline" className="w-full border-ondo-orange text-ondo-orange hover:bg-ondo-orange hover:text-white">
                    {getRecentMaintenance().length === 0 ? 'Submit New Request' : 'View All Requests'}
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
                <div className="text-center py-4">
                  <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No messages yet</p>
                </div>
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
              <CardTitle>{assignedProperty?.title || 'Property Details'}</CardTitle>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <CardDescription>
                  {assignedProperty?.addressLine1 && assignedProperty?.city 
                    ? `${assignedProperty.addressLine1}, ${assignedProperty.city}`
                    : loadingProperty ? 'Loading property details...' : 'No property assigned'
                  }
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {loadingProperty ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Loading property...</p>
                </div>
              ) : assignedProperty ? (
                <div className="space-y-6">
                  {/* Property Status Badge */}
                  <div className="flex justify-end">
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <Building className="h-3 w-3 mr-1" />
                      Occupied
                    </Badge>
                  </div>

                  {/* Property Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Monthly Rent</label>
                      <p className="text-lg font-semibold">${assignedProperty.price?.toLocaleString() || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Property Type</label>
                      <p className="text-lg capitalize">{assignedProperty?.type || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Bedrooms</label>
                      <p className="text-lg">{assignedProperty?.bedrooms || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Bathrooms</label>
                      <p className="text-lg">{assignedProperty?.bathrooms || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Square Footage</label>
                      <p className="text-lg">{assignedProperty?.sqft?.toLocaleString() || 'N/A'} sq ft</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <p className="text-lg capitalize">{assignedProperty?.status || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Property Description */}
                  {assignedProperty?.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Description</label>
                      <p className="text-gray-700 mt-1">{assignedProperty.description}</p>
                    </div>
                  )}

                  {/* Amenities */}
                  {assignedProperty?.amenities && assignedProperty.amenities.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Amenities</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {assignedProperty.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Owner Information
                  {assignedProperty?.owner && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Property Owner</h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="font-medium">{assignedProperty.owner.firstName} {assignedProperty.owner.lastName}</p>
                        <p className="text-sm text-gray-600">{assignedProperty.owner.email}</p>
                      </div>
                    </div>
                  )} */}

                  {/* Property Photos */}
                  {assignedProperty?.photos && assignedProperty.photos.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Property Photos</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {assignedProperty.photos.map((photo) => (
                          <img
                            key={photo.id}
                            src={photo.url}
                            alt={photo.caption || 'Property photo'}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Property Assigned</h3>
                  <p className="text-gray-600">You haven't been assigned to a property yet. Contact your property manager for more information.</p>
                </div>
              )}
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
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment History</h3>
                  <p className="text-gray-600 mb-4">Your payment history will appear here once you make payments.</p>
                  <Button className="bg-ondo-orange hover:bg-ondo-red text-white">
                    Coming Soon... {/* Make Payment */}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
